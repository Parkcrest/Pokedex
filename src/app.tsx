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
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setItems([]);
    // Fetch once the page loads
    // but only the first time.
    getPokemon(offset).then(setItems);
  }, [offset]);

  const searchValueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  //Search for one pokemon
  //and return basic results
  //or return basic error if search term not found.
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

  //Move through pokemon API results by a fixed increment.
  const offsetHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const id: string = e.currentTarget.id;
    if (id === "next") {
      setOffset(offset + 10);
    }
    if (id === "prev") {
      setOffset(offset - 10);
    }
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
        <button id="prev" onClick={offsetHandler}>
          Previous
        </button>
        <button id="next" onClick={offsetHandler}>
          Next
        </button>
        <PokemonList items={items} />
      </div>
    </div>
  );
};
