import "./PokemonDetail.css";
import React from "react";
import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PokemonDetail = (props) => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonDetail);
  const { id } = useParams();

  React.useEffect(() => {
    if (id.length < 6) {
      const parsedId = parseInt(id);
      dispatch(actions.getPokemonById(parsedId));
    } else {
      dispatch(actions.getPokemonById(id));
    }
  }, [dispatch,id]);

  return (
    <div className="pokemon-detail-container">
      <div className="pokemon-detail-card">
        <h1 className="pokemon-detail-title">{pokemon.name}</h1>
        <img className="pokemon-detail-img" src={pokemon.frontSprite} alt={`${pokemon.name} art`} />
        <ul className="pokemon-detail-types">
          {pokemon.types
            ? pokemon.types.map((type) => {
                return <li key={type} className={`type-button ${type}`}>{type}</li>;
              })
            : null}
          {pokemon.tipos
            ? pokemon.tipos.map((type) => {
                return <li key={type.name} className={`type-button ${type}`}>{type.name}</li>;
              })
            : null}
        </ul>
        <div className="pokemon-detail-atrributes">
          <p className="pokemon-detail-attribute">Height: {pokemon.height}</p>
          <p className="pokemon-detail-attribute">Weight: {pokemon.weight}</p>
          <p className="pokemon-detail-attribute">Life: {pokemon.life}</p>
          <p className="pokemon-detail-attribute">Attack: {pokemon.attack}</p>
          <p className="pokemon-detail-attribute">Defense: {pokemon.defense}</p>
          <p className="pokemon-detail-attribute">Speed: {pokemon.speed}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
