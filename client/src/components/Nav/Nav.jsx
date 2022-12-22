import React from "react";
import './Nav.css'
import { Link } from "react-router-dom";

const Nav = (props) => {
    return (
        <div>
            <nav>
                <ul className="styled-ul">
                    <li>
                        <Link to={`/pokemons`}>Pokemons</Link>
                    </li>
                    <li>
                        <Link to={`/pokemons/create`}>Create Pokemon</Link>
                    </li>
                    <li>
                        <Link to={`/pokemons`}>About</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav;