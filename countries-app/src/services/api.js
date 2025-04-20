const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async () => {
    try {
        const response = await fetch(`${BASE_URL}/all`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error fetching countries:', err);
        return [];
    }
};