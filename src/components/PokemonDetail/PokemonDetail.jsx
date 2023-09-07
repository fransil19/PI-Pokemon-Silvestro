import "./PokemonDetail.css";
import React from "react";
import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";


const PokemonDetail = (props) => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonDetail);
  const history = useHistory()
  const { id } = useParams();

  React.useEffect(() => {
    if (id.length < 6) {
      const parsedId = parseInt(id);
      dispatch(actions.getPokemonById(parsedId));
    } else {
      dispatch(actions.getPokemonById(id));
    }
  }, [dispatch,id]);

  const buttonDelete = () => {
    dispatch(actions.deletePokemon(id));
    history.push('/pokemons')
  };

  return (
    <div className="pokemon-detail-container">
      <div className="pokemon-detail-card">
        <div className="pokemon-detail-card-header">
          <h1 className="pokemon-detail-title">{pokemon.name}</h1>
          {id.length > 6 ? <button  className="pokemon-detail-card-edit-button"><Link to={`/pokemons/${id}/edit`}>Edit Pokemon</Link></button> : null}
          {id.length > 6 ? <button  className="pokemon-detail-card-delete-button" onClick={buttonDelete}>Delete Pokemon</button> : null}
        </div>
        
        <img className="pokemon-detail-img" src={pokemon.frontSprite || "/pokeball-png-45332.png"} alt={`${pokemon.name} art`} />
        <ul className="pokemon-detail-types">
          {pokemon.types
            ? pokemon.types.map((type) => {
                return <li key={type} className={`pokemon-detail-type-button ${type}`}>{type}</li>;
              })
            : null}
          {pokemon.tipos
            ? pokemon.tipos.map((type) => {
                return <li key={type.name} className={`pokemon-detail-type-button ${type.name}`}>{type.name}</li>;
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
