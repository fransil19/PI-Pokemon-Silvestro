//import "./CharacterCard.css";
import React from "react";
import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const TypeFilter = (props) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  /* const deleteCharClick = (id) => {
    dispatch(actions.deleteCharacter(id))
  } */

  React.useEffect(() => {
    dispatch(actions.getTypes());
  }, []);

  const onChangeSelector = (e) => {
    let filter = e.target.options[e.target.selectedIndex].value;
    dispatch(actions.filterPokemon(filter))
  };

  return (
    <div>
      <select name="types" onChange={onChangeSelector}>
          <option value="all">All</option>
          {types
            ? types.map((tipo) => {
                return (
                  <option key={tipo.id} value={tipo.name}>
                    {tipo.name}
                  </option>
                );
              })
            : null}
        </select>
    </div>
  );
};

export default TypeFilter;