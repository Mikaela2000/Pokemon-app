const axios = require('axios');
const { Pokemon, Types } = require('../db');

const getPokemonApi = async (name) => {
  try {
    if (name) {
      const pokeByName = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (pokeByName) {
        return [{
          id: pokeByName.data.id,
          name: pokeByName.data.name,
          hp: pokeByName.data.stats[0].base_stat,
          attack: pokeByName.data.stats[1].base_stat,
          defense: pokeByName.data.stats[2].base_stat,
          speed: pokeByName.data.stats[5].base_stat,
          height: pokeByName.data.height,
          weight: pokeByName.data.weight,
          image: pokeByName.data.sprites.other.dream_world.front_default,
          types: pokeByName.data.types.map((e) => e.type.name),
        }];
      } else {
        return [];
      }
    } else {
      const pokemonsApi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=60');
      const subRequest = pokemonsApi.data.results.map((e) => axios.get(e.url)); //creamos un array de promesas para obtener info mas detallada 
      let promiseRequest = await Promise.all(subRequest);//procesamos cada resultado en el array

 //promise.all esperan que todas las promesas se resulevan antes de que el codigo se siga ejecutando
      promiseRequest = promiseRequest.map((e) => {
        return {
          id: e.data.id,
          name: e.data.name,
          hp: e.data.stats[0].base_stat,
          attack: e.data.stats[1].base_stat,
          defense: e.data.stats[2].base_stat,
          speed: e.data.stats[5].base_stat,
          height: e.data.height,
          weight: e.data.weight,
          image: e.data.sprites.other.dream_world.front_default,
          createInDb: 'false',
          types: e.data.types.map((e) => e.type.name),

        };
      });

      return promiseRequest;
    }
  } catch (error) {
    console.log(error);
  }
};

const getPokemonDb = async (name) => {
  try {
    if(name){
      let onePokemon= await Pokemon.findOne({ where: { name: name.toLowerCase() },   include: {
        model: Types,
        attributes: ['name'],
        through: {
          attributes: []
        },
      },})

      if(onePokemon){
        return [{
          id: onePokemon.dataValues.id,
          name: onePokemon.dataValues.name,
          hp: onePokemon.dataValues.hp,
          attack: onePokemon.dataValues.attack,
          defense: onePokemon.dataValues.defense,
          speed: onePokemon.dataValues.speed,
          height: onePokemon.dataValues.height,
          weight: onePokemon.dataValues.weight,
          image: onePokemon.dataValues.image,
          types: onePokemon.dataValues.types.map((e) =>  e.name),
        }];
      }else {
        return [];
      }

    }else{
     let allPokemon = await Pokemon.findAll({
        include: {
          model: Types,
          attributes: ['name'],
          through: {
            attributes: []
          },
        },
      });
      const transformedPokemon = allPokemon.map((pokemon) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          hp: pokemon.hp,
          attack: pokemon.attack,
          defense: pokemon.defense,
          speed: pokemon.speed,
          height: pokemon.height,
          weight: pokemon.weight,
          image: pokemon.image,
          types: pokemon.types.map((type) => type.name),
        };
      });
      
      return transformedPokemon;
    }
  } catch (error) {
    console.log('Error retrieving Pokemon from the database:', error);
    throw error;
  }
};

const getPokemons = async (req, res) => {
  try {
    const { name } = req.query;
    const pokemonsApi = await getPokemonApi(name);
    const pokemonsDb = await getPokemonDb(name);

    if(pokemonsApi){
      const infoTotal = pokemonsDb.concat(pokemonsApi)
      res.json(infoTotal)
    }else{
      res.json(pokemonsDb)
    }
    
  } catch (error) {
    console.log(error);
  }
};

const getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id && id.length < 5) {
      let pokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

      let pokemonByIdApi = [{
        id: pokemonApi.data.id,
        name: pokemonApi.data.name,
        hp: pokemonApi.data.stats[0].base_stat,
        attack: pokemonApi.data.stats[1].base_stat,
        defense: pokemonApi.data.stats[2].base_stat,
        speed: pokemonApi.data.stats[5].base_stat,
        height: pokemonApi.data.height,
        weight: pokemonApi.data.weight,
        image: pokemonApi.data.sprites.other.dream_world.front_default,
        createInDb: 'false',
        types: pokemonApi.data.types.map((e) => e.type.name).join(", "),
      }];

      res.send(pokemonByIdApi);
    } else {
      let pokemon = await Pokemon.findAll({
        include: {
          model: Types,
          attributes: ['name'],
          through: {
            attributes: []
          },
        },
      });
      let pokemonIdDb = pokemon.filter(e => e.id === id);
      res.send(pokemonIdDb);
    };
  } catch (error) {
    console.log(error);
  };
};
const postPokemon = async (req, res) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, image, types} = req.body;
    
    const findPokemon = await Pokemon.findOne({ where: { name: name.toLowerCase() }, });
    if (findPokemon) {
      res.send('Pokemon already exists');
    } else {
      let newPokemon = await Pokemon.create({
        name: name.toLowerCase(),
        image: image,
        hp: hp,
        attack: attack,
        defense: defense,
        speed: speed,
        height: height,
        weight: weight,
      });

      let pokemonType = await Types.findAll({
        where: {
          name: types
        },
      });
   
      const relacion= await newPokemon.setTypes(pokemonType); //establece las relaciones entre los dos modelos(mucho a muchos)

      res.send("Pokemon Created");
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPokemons,
  postPokemon,
  getPokemonById

};