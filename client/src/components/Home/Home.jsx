import React from "react";

import { Link } from "react-router-dom";

const Home = (props) => {
    return (
        <div className="container">
            <div>Welcome to PokePi</div>
            <button><Link to={`/pokemons`}>Enter the Pokeverse</Link></button>
        </div>
    )
}

export default Home;