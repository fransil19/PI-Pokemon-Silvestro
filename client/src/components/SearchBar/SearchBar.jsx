//import "./CharacterCard.css";
import React, {useState} from "react";
import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = (props) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("")
  const errors = useSelector((state) => state.errors); 

  const onChangeInput = (e) => {
    setSearch(e.target.value)
  };

  const buttonSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.getPokemonByName(search));
    setSearch("")
  };

  return (
    <div>
      <form action="" onSubmit={buttonSubmit}>
        <input type="text" name="name" onChange={onChangeInput} placeholder="Enter the pokemon name" value={search}/>
        <button type="submit">Search</button>
        {errors.searchBar ? <p>{errors.searchBar}</p> : null}
      </form>
    </div>
  );
};

export default SearchBar;