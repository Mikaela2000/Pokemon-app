const { Router } = require('express');
const {postPokemon, getPokemons, getPokemonById} = require('../controllers/getPokemons')
const {getTypes} = require('../controllers/getTypes')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getPokemons)
router.get('/pokemons/:id', getPokemonById)
router.post('/pokemons', postPokemon)
router.get('/types', getTypes)

module.exports = router;

