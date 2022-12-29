import "./PokemonContainer.css";
import React, { useState } from "react";
import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "../PokemonCard/PokemonCard";
import SearchBar from "../SearchBar/SearchBar";
import TypeFilter from "../TypeFilter/TypeFilter";
import OrderPokemon from "../OrderPokemon/OrderPokemon";
import Pagination from "../Pagination/Pagination";

const PokemonContainer = (props) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);

  const pokesPerPage = 12;
  const totalPages = Math.ceil(filteredPokemons.length / pokesPerPage);

  const indexOfLastPoke = currentPage * pokesPerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokesPerPage;

  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPoke,
    indexOfLastPoke
  );

  /* const deleteCharClick = (id) => {
    dispatch(actions.deleteCharacter(id))
  } */

  React.useEffect(() => {
    dispatch(actions.getPokemons());
  }, []);

  return (
    <div className="container">
      <div className="compContainer">
        <SearchBar />
        <div className="filter-container">
          <TypeFilter />
          <OrderPokemon />
        </div>

        <div className="pokeContainer">
          {currentPokemons
            ? currentPokemons.map((pokemon) => {
                return (
                  <PokemonCard
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                    frontSprite={pokemon.frontSprite}
                    types={pokemon.types || pokemon.tipos}
                  />
                );
              })
            : null}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default PokemonContainer;
