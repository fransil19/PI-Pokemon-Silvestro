import './App.css';
import React from "react";
import { Route, Switch } from "react-router-dom";
import PokemonContainer from './components/PokemonContainer/PokemonContainer';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/pokemons">
          <Nav />
          <PokemonContainer />
        </Route>
        <Route exact path="/pokemons/create">
          <Nav />
          <CreatePokemon />
        </Route>
        <Route exact path="/pokemons/:id">
          <Nav />
          <PokemonDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
