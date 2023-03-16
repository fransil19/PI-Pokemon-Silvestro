import "./CreatePokemon.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

const CreatePokemon = () => {
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    name: "",
    life: null,
    attack: null,
    defense: null,
    speed: null,
    height: null,
    weight: null,
    types: [],
  });

  React.useEffect(() => {
    dispatch(actions.getTypes());
  }, []);

  const onChangeInput = (e) => {
    if (e.target.name === "name") {
      if (!/^[a-zA-Z\s]*$/.test(e.target.value)) {
        setError("The name must have only letters");
      }
      else{
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
        setError("")
      }
    }
    else{
      if(e.target.value<=0 || e.target.value > 300){
        setError(`${e.target.name} must be between 1 and 300`);
      }
      else{
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
        setError("")
      }
    }
    
  };

  const onChangeSelector = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    if(value.length > 2){
      setError(`You must choose up to 2 types`);
    }
    else{
      setInput({
        ...input,
        types: value,
      });
      setError("")
    }
    
  };
  const buttonSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.createPokemon(input));
    console.log(pokemons);
  };

  return (
    <div>
      <h2 className="create-title">Create your Pokemon</h2>
      <form action="" onSubmit={buttonSubmit} className="create-container">
        <label htmlFor="">Name</label>
        <input type="text" name="name" onChange={onChangeInput} />
        <label htmlFor="">Life</label>
        <input type="number" name="life" onChange={onChangeInput} />
        <label htmlFor="">attack</label>
        <input type="number" name="attack" onChange={onChangeInput} />
        <label htmlFor="">defense</label>
        <input type="number" name="defense" onChange={onChangeInput} />
        <label htmlFor="">speed</label>
        <input type="number" name="speed" onChange={onChangeInput} />
        <label htmlFor="">height</label>
        <input type="number" name="height" onChange={onChangeInput} />
        <label htmlFor="">weight</label>
        <input type="number" name="weight" onChange={onChangeInput} />
        <label htmlFor="">types</label>
        <select name="types" onChange={onChangeSelector} multiple>
          {types
            ? types.map((tipo) => {
                return (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.name}
                  </option>
                );
              })
            : null}
        </select>
        {error !== "" ? <p className="form-error">{error}</p> : null}
        <button type="submit" className="create-submit">Create Pokemon</button>
      </form>
    </div>
  );
};

export default CreatePokemon;
