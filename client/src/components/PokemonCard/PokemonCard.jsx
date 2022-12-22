import "./PokemonCard.css";
import React from "react";
import { Link } from "react-router-dom";

const PokemonCard = (props) => {

  return (
    <div className="card">
      <h3><Link to={`/pokemons/${props.id}`}>{props.name}</Link></h3>
      <img src={props.frontSprite} alt="" />
      <ul>
        {props.types
          ? props.types.map((type) => {
              return type.id ? <li key={type.name}>{type.name}</li> : <li key={type}>{type}</li>
            })
          : null}
      </ul>
    </div>
  );
};

export default PokemonCard;
