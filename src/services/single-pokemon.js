export const getSinglePokemon = async (pokemon) => {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + pokemon.toLowerCase()
  );
  if (response.status === 404) {
    throw Error(
      "Shoot, that Pokemon's not in the Pokedex, please enter a valid Pokemon."
    );
  }
  const data = await response.json();

  const singlePokemon = [
    { name: data.name, id: data.id, image: data.sprites.front_default },
  ];
  return singlePokemon;
};
