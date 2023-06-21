const { Types } = require('../db');
const axios = require('axios');

const getTypes = async (req, res) => {
  try {
    const types = await Types.findAll();
    console.log(types);

    if (types.length > 0) {
      res.json(types);
    } else {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      const typeResults = response.data.results;

      const types = await Promise.all(
        typeResults.map(async (type) => {
          const typeData = await axios.get(type.url);

          return {
            name: typeData.data.name
          };
        })
      );
      await Types.bulkCreate(types);
      // console.log(types);
      res.json(types);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getTypes,
};