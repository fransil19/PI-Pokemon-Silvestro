import "./PokemonCard.css";
import React from "react";
import { Link } from "react-router-dom";

const PokemonCard = (props) => {

  return (
    <div className={`pokecard`}>
      <div className="imgContainer">
        <h3>
          <Link to={`/pokemons/${props.id}`} className="pokeName">{props.name}</Link>
        </h3>
        {props.frontSprite ? <img src={props.frontSprite} alt="" /> : <img src="/pokeball-png-45332.png" alt="" />}
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
