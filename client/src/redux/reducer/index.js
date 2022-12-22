import { GET_ALL_POKEMON, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES, CREATE_POKEMON, SET_ERROR, FILTER_POKEMON, ORDER_POKEMON } from "../actions";

const initialState = {
  pokemons: [],
  filteredPokemons: [],
  pokemonDetail: {},
  types: [],
  errors: {}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMON:
      return {
        ...state,
        pokemons: action.payload,
        filteredPokemons: action.payload
      }
    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemonDetail: action.payload
      }
    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        filteredPokemons: action.payload,
        errors: {}
      }
    case GET_TYPES:
      return {
        ...state,
        types: action.payload
      }
    case CREATE_POKEMON:
      return {
        ...state,
        pokemons: state.pokemons.concat(action.payload)
      }
    case SET_ERROR:
      const comp = action.errorField
      const obj = {
        ...state,
        errors: {}
      }
      obj.errors[comp] = action.payload
      return obj
    case FILTER_POKEMON:
      if (action.payload === "all") return {
        ...state,
        filteredPokemons: state.pokemons
      }
      const filter = state.pokemons.filter(poke => {
        if (poke.tipos) {
          return poke.tipos.some(tipo => tipo.name === action.payload)
        }
        else {
          return poke.types.some(t => t === action.payload)
        }
      })
      return {
        ...state,
        filteredPokemons: filter
      }

    case ORDER_POKEMON:
      if (action.sense) {
        if (action.sense === 'asc') {
          return {
            ...state,
            filteredPokemons: [...state.filteredPokemons].sort((a, b) => {
              return a[action.payload] - b[action.payload]
            })
          }
        }
        else {
          return {
            ...state,
            filteredPokemons: [...state.filteredPokemons].sort((a, b) => {
              return b[action.payload] - a[action.payload]
            })
          }
        }
      }
      else {
        return {
          ...state,
          filteredPokemons: [...state.filteredPokemons].sort((a, b) => {
            return a[action.payload] - b[action.payload]
          })
        }
      }
    default:
      return state
  }
};

export default rootReducer;