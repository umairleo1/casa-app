import data from '../../assets/json/result.json';

export const getCountries = () => Object.keys(data);

export const getStates = country => data[country];
