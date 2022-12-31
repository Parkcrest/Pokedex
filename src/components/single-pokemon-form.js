export const SinglePokemonForm = (props) => {
  return (
    <form>
      <label htmlFor="pokemon-search">
        Search Pokemon by Name:
        <input
          type="text"
          id="pokemon-search"
          onChange={props.change}
          value={props.value}
        />
      </label>
      <input onClick={props.click} type="submit" value="Search" />
    </form>
  );
};
