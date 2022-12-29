import "./PokemonCard.css";
import React from "react";
import { Link } from "react-router-dom";

const PokemonCard = (props) => {
  const typeClass = props.types[0].id ? props.types[0].name : props.types[0];

  return (
    <div className={`pokecard`}>
      <div className="imgContainer">
        <h3>
          <Link to={`/pokemons/${props.id}`} className="pokeName">{props.name}</Link>
        </h3>
        <img src={props.frontSprite} alt="" />
      </div>
      <div className="typeContainer">
      {props.types
          ? props.types.map((type) => {
              return type.id ? (
                <button key={type.name} className={`type-button ${type.name}`}>{type.name}</button>
              ) : (
                <button key={type} className={`type-button ${type}`}>{type}</button>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default PokemonCard;
