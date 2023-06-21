import axios from 'axios';
export const GET_POKEMON = "GET_POKEMON";
export const GET_POKEMONBYID = "GET_POKEMONBYID"
export const ORDER_NAME = "ORDER_NAME"
export const ORDER_ATTACK = "ORDER_ATTACK"
export const FILTER_ORIGEN = "FILTER_ORIGEN"
export const FILTER_TYPE = "FILTER_TYPE"
export const POST_POKEMON = "POST_POKEMON"
export const GET_NAME_POKEMONS = "GET_NAME_POKEMONS"
export const GET_TYPES = "GET_TYPES"
export const SHOW_ALL= "SHOW_ALL"
export const LIMPIAR_POKEMON_DETAIL= "LIMPIAR_POKEMON_DETAIL"

export const getPokemons = () => {
    return async function (dispatch) {
        const apiPokemon = await axios.get('http://localhost:3001/pokemons');
        const pokemons = apiPokemon.data;
        dispatch({ type: GET_POKEMON, payload: pokemons })
    }
}

export const getLPokemonsById = (id) => {
    return async function (dispatch) {
        const pokemonById = await axios.get(`http://localhost:3001/pokemons/${id}`)
        const infoPokemonId = pokemonById.data;
        dispatch({ type: GET_POKEMONBYID, payload: infoPokemonId })
    }
}

export const agregarPokemon = (payload) => {
    return async function () {
        const postPokemon = await axios.post('http://localhost:3001/pokemons', payload);
        return postPokemon;
    }
}

export const getTypes = () => {
    return async function (dispatch) {
        let info = await axios("http://localhost:3001/types")
        const tipos = info.data;
        dispatch({ type: GET_TYPES, payload: tipos })
    }
}


export const getNameCharacters = (name) => {
    return async function (dispatch) {
        try {
            let pokemon = await axios.get("http://localhost:3001/pokemons?name=" + name);
            return dispatch({ type: GET_NAME_POKEMONS, payload: pokemon.data})
            
        } catch (error) {
            alert('Pokemon no encontrado')
            
        }
         
    }
}

export const limpiarDetail=(action)=>{
    return {type: LIMPIAR_POKEMON_DETAIL, payload:action}
}

export const orderName = (order) => {
    return { type: ORDER_NAME, payload: order }
}

export const orderAttack = (order) => {
    return { type: ORDER_ATTACK, payload: order }
}

export const filterOrigenCards = (payload) => {
    return { type: FILTER_ORIGEN, payload}
}

export const filterType = (filter) => {
    return { type: FILTER_TYPE, payload: filter }
}

export const showAllCards = () => {
    return { type: SHOW_ALL};
};