import "./TypeFilter.css";
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
    <div className="type-selector">
      <select name="types" onChange={onChangeSelector} className="select-type-input">
          <option value="all">All</option>
          {types
            ? types.map((tipo) => {
                return (
                  <option key={tipo.id} value={tipo.name} className="select-type-option">
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