/**
 * This file helps separate the API call
 * from the React application so we can
 * create a data type that we control
 * instead of relying on the API to never
 * change.
 */

// type PokeApiResults = {
//   results: { name: string; url: string }[];
// };

const baseUrl = "https://pokeapi.co/api/v2";

export const getPokemonList = async (
  offset: number
): Promise<PokemonListResults> => {
  const response = await fetch(`${baseUrl}/pokemon?limit=20&offset=${offset}`);
  const data: PokemonListResults = await response.json();
  return data;
};

export const getPokemonByName = async (name: string): Promise<Pokemon> => {
  const response = await fetch(`${baseUrl}/pokemon/${name.toLowerCase()}`);
  if (response.status === 404) {
    throw Error(
      "Shoot, that Pokemon's not in the Pokedex, please enter a valid Pokemon."
    );
  }
  const data = await response.json();

  return { name: data.name, id: data.id, image: data.sprites.front_default };
};

export const getPokemonByUrl = async (url: string): Promise<Pokemon> => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return {
    name: data.name,
    id: data.id,
    image: data.sprites.front_default,
    types: data.types.map((type: any) => type.type.name),
    stats: data.stats.map((stat: any) => ({
      baseStat: stat.base_stat,
      effort: stat.effort,
      name: stat.stat.name,
    })),
  };
};

export const getFocusPokemonByUrl = async (
  name: string
): Promise<FocusPokemon> => {
  const data = await Promise.all([
    fetch(`${baseUrl}/pokemon-species/${name}`),
    fetch(`${baseUrl}/pokemon/${name}`),
  ]).then((responses) => Promise.all(responses.map((r) => r.json())));
  return {
    name: data[1].name,
    id: data[1].id,
    image: data[1].sprites.front_default,
    types: data[1].types.map((type: any) => type.type.name),
    height: data[1].height,
    weight: data[1].weight,
    abilities: data[1].abilities.map((ability: any) => ability.ability.name),
    stats: data[1].stats.map((stat: any) => ({
      baseStat: stat.base_stat,
      name: stat.stat.name,
    })),
    description:
      data[0].flavor_text_entries.length !== 0
        ? data[0].flavor_text_entries
            .filter((flavorText: any) => flavorText.language.name === "en")
            .map((flavor: any) => flavor.flavor_text)
        : "There is no description available for this mysterious POKEMON.",
  };
};
