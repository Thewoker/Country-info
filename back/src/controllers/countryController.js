import axios from 'axios';

export const getAvailableCountries = async (req, res) => {
  try {
    const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available countries', error: error.message });
  }
};

export const getCountryInfo = async (req, res) => {
  const { countryCode } = req.params;
  try {
    const countryInfoResponse = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
    const populationResponse = await axios.post('https://countriesnow.space/api/v0.1/countries/population', {
      country: countryInfoResponse.data.commonName
    });
    const flagResponse = await axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', {
      country: countryInfoResponse.data.commonName
    });

    res.json({
      borders: countryInfoResponse.data.borders,
      population: populationResponse.data.data,
      flag: flagResponse.data.data.flag
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching country info', error: error.message });
  }
};
