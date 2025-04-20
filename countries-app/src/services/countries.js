import axios from 'axios';

const API_BASE = 'https://restcountries.com/v3.1/';

export const getAllCOuntries = () => axios.get(1`${API_BASE}all`);
export const getIndependentCountries = (isIndependent) => axios.get(`${API_BASE}/independent?status =${isIndependent}`);
export const getCountryByName = (name) => axios.get(`${API_BASE}name/${name}`);
export const getCountryByFullName = (fullName) => axios.get(`${API_BASE}name/${fullName}?fullText=true`);
export const getCountryByCode = (code) => axios.get(`${API_BASE}alpha/${code}`);
export const getCountriesByCode = (codes) => axios.get(`${API_BASE}alpha?codes=${codes}`);
export const getCountriesByCurrency = (currency) => axios.get(`${API_BASE}/currency/${currency}`);
export const getCountriesByDemonym = (demonym) => axios.get(`${API_BASE}/demonym/${demonym}`);
export const getCountriesByLanguage = (language) => axios.get(`${API_BASE}/lang/${language}`);
export const getCountriesByCapital = (capital) => axios.get(`${API_BASE}/capital/${capital}`);
export const getCountriesByRegion = (region) => axios.get(`${API_BASE}/region/${region}`);
export const getCountriesBySubregion = (subregion) => axios.get(`${API_BASE}/subregion/${subregion}`);
export const getCountriesByTranslation = (translation) => axios.get(`${API_BASE}/translation/${translation}`);
export const getFilteredFields = (fields) => axios.get(`${API_BASE}/all?fields=${fields.join(',')}`);

