/**
 * Smart component that controls all
 * state and data fetching until we
 * need to break it out and push state
 * down.
 */
import { useEffect, useState } from "react";
import { PokemonList } from "./components/pokemon-list/pokemon-list";
import { getPokemon } from "./services/pokemon";
import "./app.css";
import { SinglePokemonComponent } from "./components/single-pokemon-component";
import { getSinglePokemon } from "./services/single-pokemon";
import { SinglePokemonForm } from "./components/single-pokemon-form";

export const App = () => {
  const [items, setItems] = useState<Pokemon[]>([]);
  const [searchValue, setSearchValue] = useState("Pikachu");
  const [singlePokemon, setSinglePokemon] = useState([{}]);
  const [error, setError] = useState();
  // const [statItems, setStatItems] = useState([]);
  useEffect(() => {
    setItems([]);
    // Fetch once the page loads
    // but only the first time.
    getPokemon().then(setItems);
  }, []);

  const searchValueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const singlePokemonClickHandler = (e: Event) => {
    e.preventDefault();
    setSinglePokemon([{}]);
    setError(undefined);
    getSinglePokemon(searchValue)
      .then(setSinglePokemon)
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="App">
        <SinglePokemonForm
          value={searchValue}
          change={searchValueChangeHandler}
          click={singlePokemonClickHandler}
        />

        {singlePokemon ? (
          <SinglePokemonComponent singlePokemonData={singlePokemon} />
        ) : (
          ""
        )}
        {error ? <p>{error}</p> : ""}
        <PokemonList items={items} />
      </div>
    </div>
  );
};
