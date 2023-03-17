import axios from "axios";

export const GET_ALL_POKEMON = "GET_ALL_POKEMON";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const SET_ERROR = "SET_ERROR";
export const FILTER_POKEMON = "FILTER_POKEMON";
export const ORDER_POKEMON = "ORDER_POKEMON";

const {
    REACT_APP_URL_BACK
  } = process.env;

export const getPokemons = (name) => {
    return async function (dispatch) {
        if (name) {
            console.log("URL_BACK:", REACT_APP_URL_BACK);
            await axios
                .get(`${REACT_APP_URL_BACK}/pokemons/?name=${name}`)
                .then((response) =>
                    dispatch({ type: GET_ALL_POKEMON, payload: response.data })
                );
        }
        else {
            await axios
                .get(`${REACT_APP_URL_BACK}/pokemons`)
                .then((response) =>
                    dispatch({ type: GET_ALL_POKEMON, payload: response.data })
                );
        }
    };
};

export const getPokemonById = (id) => {
    return async function (dispatch) {
        await axios
            .get(`${REACT_APP_URL_BACK}/pokemons/${id}`)
            .then((response) => {
                dispatch({ type: GET_POKEMON_BY_ID, payload: response.data })
            }

            );
    };
};

export const getPokemonByName = (name) => {
    return async function (dispatch) {
        await axios
            .get(`${REACT_APP_URL_BACK}/pokemons?name=${name}`)
            .then((response) => {
                if (response.data.message) {
                    dispatch({ type: SET_ERROR, payload: response.data.message, errorField: "searchBar" })
                }
                else {
                    dispatch({ type: GET_POKEMON_BY_NAME, payload: response.data })
                }
            }
            );
    };
};

export const getTypes = () => {
    return async function (dispatch) {
        await axios
            .get(`${REACT_APP_URL_BACK}/types`)
            .then((response) => {
                dispatch({ type: GET_TYPES, payload: response.data })
            }

            );
    };
};

export const createPokemon = (pokemon) => {
    return async function (dispatch) {
        await axios
            .post(`${REACT_APP_URL_BACK}/pokemons`, pokemon)
            .then((response) => {
                console.log(response.data);
                dispatch({ type: CREATE_POKEMON, payload: response.data })
            }

            );
    };
};

export const filterPokemon = (filter) => {
    return async function (dispatch) {
        dispatch({ type: FILTER_POKEMON, payload: filter})
    };
};

export const orderPokemon = (order, sense) => {
    return async function (dispatch) {
        dispatch({ type: ORDER_POKEMON, payload: order, sense: sense})
    };
};