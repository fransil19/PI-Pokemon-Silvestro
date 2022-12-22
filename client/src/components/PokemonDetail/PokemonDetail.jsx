//import "./CharacterCard.css";
import React from "react";
import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PokemonDetail = (props) => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonDetail);
  const { id } = useParams();
  


  React.useEffect(() => {
    if(id.length < 6) {
      const parsedId = parseInt(id);
      dispatch(actions.getPokemonById(parsedId));
    }
    else{
      dispatch(actions.getPokemonById(id));
    }
  }, []);

  return (
    <div className="card">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.frontSprite} alt="" />
      <ul>
        {pokemon.types
          ? pokemon.types.map((type) => {
              return <li key={type}>{type}</li>;
            })
          : null}
          {pokemon.tipos
          ? pokemon.tipos.map((type) => {
              return <li key={type.name}>{type.name}</li>;
            })
          : null}
      </ul>
      <p>height:{pokemon.height}</p>
      <p>weight:{pokemon.weight}</p>
      <p>life:{pokemon.life}</p>
      <p>attack:{pokemon.attack}</p>
      <p>defense:{pokemon.defense}</p>
      <p>speed:{pokemon.speed}</p>
    </div>
  );
};

export default PokemonDetail;
