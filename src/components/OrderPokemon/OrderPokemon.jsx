import "./OrderPokemon.css";
import React from "react";
import * as actions from "../../redux/actions";
import { useDispatch} from "react-redux";

const OrderPokemon = (props) => {
  const dispatch = useDispatch();

  /* const deleteCharClick = (id) => {
    dispatch(actions.deleteCharacter(id))
  } */

  const onChangeSelector = (e) => {
    let order = e.target.options[e.target.selectedIndex].value;
    if(order !== 'id'){
      order = order.split('-')
      dispatch(actions.orderPokemon(order[0], order[1]))
    }
    else{
      dispatch(actions.orderPokemon(order))
    }
  };

  return (
    <div className='order-selector'>
      <select name="types" onChange={onChangeSelector} className="select-order-input">
          <option key="id-asc"  value="id-asc">ID-asc</option>
          <option key="id-desc"  value="id-desc">ID-desc</option>
          <option key="alph-asc"  value="alph-asc">Alphabetical-asc</option>
          <option key="alph-desc"  value="alph-desc">Alphabetical-desc</option>
          <option key="attack-asc" value="attack-asc">Attack-asc</option>
          <option key="attack-desc" value="attack-desc">Attack-desc</option>
          <option key="defense-asc" value="defense-asc">Defense-asc</option>
          <option key="defense-desc" value="defense-desc">Defense-desc</option>
          <option key="life-asc" value="life-asc">Life-asc</option>
          <option key="life-desc" value="life-desc">Life-desc</option>
          <option key="speed-asc" value="speed-asc">Speed-asc</option>
          <option key="speed-desc" value="speed-desc">Speed-desc</option>
        </select>
    </div>
  );
};

export default OrderPokemon;