const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = process.env.GOOGLE_API_KEY;

const getCoordsForAddress = async (address) => {
  if (API_KEY == '') {
    return {
      lat: 40.7484474,
      lng: -73.9871516,
    };
  }

  const response = await axios.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
    { params: { address: address, key: API_KEY } }
  );
  console.log(response.data);

  const data = response.data;
  if (!data || data.status === 'ZERO_RESULTS') {
    console.log('Could not find place');
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;
  return coordinates;
};

module.exports = getCoordsForAddress;
