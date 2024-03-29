/**
 * This file helps separate the API call
 * from the React application so we can
 * create a data type that we control
 * instead of relying on the API to never
 * change.
 */

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

export const getFocusPokemonByUrl = async (name: string) => {
  const response = await fetch(`${baseUrl}/pokemon/${name}`);
  if (response.status === 404) {
    throw new Error(
      "Shoot, that Pokemon's not in the Pokedex, please enter a valid Pokemon."
    );
  }
  console.log(Error);

  const baseData = await response.json();
  const speciesReponse = await fetch(baseData.species.url);
  const speciesData = await speciesReponse.json();

  return {
    name: baseData.name,
    id: baseData.id,
    image: baseData.sprites.front_default,
    types: baseData.types.map((type: any) => type.type.name),
    height: baseData.height * 10,
    weight: baseData.weight / 10,
    abilities: baseData.abilities.map((ability: any) => ability.ability.name),
    stats: baseData.stats.map((stat: any) => ({
      baseStat: stat.base_stat,
      name: stat.stat.name,
    })),
    description:
      speciesData.flavor_text_entries.length !== 0
        ? speciesData.flavor_text_entries
            .filter((flavorText: any) => flavorText.language.name === "en")
            .map((flavor: any) => flavor.flavor_text)
        : "There is no description available for this mysterious POKEMON.",
  };
};

export const getPokemonNamesList = async (): Promise<string[]> => {
  const response = await fetch(`${baseUrl}/pokemon?limit=100000&offset=0}`);
  const data: PokemonListResults = await response.json();
  const nameList = data.results.map((item) => item.name);

  return nameList;
};
