import React from "react";
import "./Nav.css";
import { Link, useLocation } from "react-router-dom";

const Nav = (props) => {
  const location = useLocation();
  return (
    <div>
      <nav>
        <ul className="styled-ul">
          {location.pathname !== "/pokemons" ? (
            <li>
              <button>
                <Link to={`/pokemons`}>Pokemons</Link>
              </button>
            </li>
          ) : (
            <li>
              <button>
                <Link to={`/pokemons`} onClick={() => window.location.reload()}>
                  Pokemons
                </Link>
              </button>
            </li>
          )}
          {location.pathname !== "/pokemons/create" ? (
            <li>
              <button>
                <Link to={`/pokemons/create`}>Create Pokemon</Link>
              </button>
            </li>
          ) : (
            <li>
              <button>
                <Link
                  to={`/pokemons/create`}
                  onClick={() => window.location.reload()}
                >
                  Create Pokemon
                </Link>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
