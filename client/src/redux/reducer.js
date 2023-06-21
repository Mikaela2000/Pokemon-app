import { SHOW_ALL, GET_POKEMON, GET_POKEMONBYID, GET_NAME_POKEMONS, GET_TYPES, ORDER_ATTACK, ORDER_NAME, FILTER_ORIGEN, FILTER_TYPE, POST_POKEMON, LIMPIAR_POKEMON_DETAIL } from "./actions";

const initialState = {// este es el estado global
    characters: [],
    allCharacters: [],
    tipos: [],
    pokemonDetail: [],
    charactersBD: [],
    charactersApi: [],
  
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMON:
            return {
                ...state,
                characters: action.payload,
                allCharacters: action.payload
            };

        case GET_POKEMONBYID:
            return { ...state, pokemonDetail: action.payload };

        case GET_NAME_POKEMONS:
            return { ...state, characters: action.payload }

        case LIMPIAR_POKEMON_DETAIL:
            return { ...state, pokemonDetail: [] };

        case POST_POKEMON:
            return {
                ...state
            }

        case GET_TYPES:
            return {
                ...state,
                tipos: action.payload
            }

        case ORDER_NAME:
            const orderName = state.characters.slice().sort((a, b) => { //fsdf
                if (action.payload === "A") {
                    return a.name.localeCompare(b.name);
                } else if (action.payload === "D") {
                    return b.name.localeCompare(a.name);
                } //funciona
            });
            return {
                ...state,
                characters: orderName,
            }

        case ORDER_ATTACK:
            const orderAttack = state.characters.slice().sort((a, b) => {
                if (action.payload === "A") {
                    return a.attack - b.attack;
                } else if (action.payload === "D") {
                    return b.attack - a.attack; //funciona
                }
            });
            return {
                ...state,
                characters: orderAttack,
            }
        case FILTER_ORIGEN:

            const createdFilter = action.payload === 'API' ? state.allCharacters.filter(el => el.createInDb) : state.allCharacters.filter(el => !el.createInDb)
            return {
                ...state,
                characters: action.payload === 'All' ? state.allCharacters : createdFilter
            };
        case FILTER_TYPE:
            const filterTypes = state.allCharacters.filter((char) => {
                //  console.log('Character types:', char.types);
                return char.types.includes(action.payload);
            });
            console.log('Filtered characters:', filterTypes);
            return {
                ...state,
                characters: filterTypes, //funciona
            }
        case SHOW_ALL:
            return {
                ...state,
                characters: state.allCharacters,
            };

        default:
            return { ...state };
    }


}

export default reducer;