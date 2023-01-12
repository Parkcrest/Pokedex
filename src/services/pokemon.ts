/**
 * This file helps separate the API call
 * from the React application so we can
 * create a data type that we control
 * instead of relying on the API to never
 * change.
 */

type PokeApiResults = {
  results: { name: string; url: string }[];
};

type PokeApiPokemon = {
  id: string;
  species: { name: string; url: string };
  sprites: { front_default: string };
};
export const getPokemon = async (offset: number) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
  );
  const data: PokeApiResults = await response.json();

  return Promise.all(
    data.results.map((result) => fetch(result.url).then((r) => r.json()))
  ).then((results: PokeApiPokemon[]) =>
    results.map((result) => ({
      key: result.id,
      name: result.species.name,
      url: result.species.url,
      front_image: result.sprites.front_default,
    }))
  );
};
