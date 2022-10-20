import data from '../../assets/json/result.json';
import countryIosCodes from 'assets/json/country-codes.json';

export const getCountries = () => Object.keys(data);

export const getStates = country => data[country];

export const getIsoCodes = CountryName => {
  return countryIosCodes[CountryName];
};
