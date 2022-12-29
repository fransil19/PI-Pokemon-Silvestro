import './Home.css'
import React from "react";

import { Link } from "react-router-dom";

const Home = (props) => {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to PokePi</h1>
            <button className="home-button"><Link to={`/pokemons`}>Enter the Pokeverse</Link></button>
        </div>
    )
}

export default Home;