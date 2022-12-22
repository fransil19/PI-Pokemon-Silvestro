import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

const CreatePokemon = () => {
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
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
    if ([e.target.name] === "types") {
      setInput({
        ...input,
        [e.target.name]: input[e.target.name].concat([e.target.value]),
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onChangeSelector = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setInput({
      ...input,
      types: value,
    });
  };
  const buttonSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.createPokemon(input));
    console.log(pokemons);
  };

  return (
    <div>
      <form action="" onSubmit={buttonSubmit}>
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
          <option value="">--CHOOSE--</option>
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
        <button type="submit">Create Pokemon</button>
      </form>
    </div>
  );
};

export default CreatePokemon;
