export const SinglePokemonComponent = (props) => {
  return (
    <div>
      <p>{props.singlePokemonData[0].name}</p>
      <p>{props.singlePokemonData[0].id}</p>
      <img
        src={props.singlePokemonData[0].image}
        alt={props.singlePokemonData[0].name}
      />
    </div>
  );
};
