import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  getCountryByName,
  getCountriesByRegion,
  getCountryByCode,
  getCountriesByCurrency,
  getCountriesByLanguage,
  getCountriesByCapital,
  getCountriesByCodes
} from '../services/countries';

const POPULAR_COUNTRIES = ['USA', 'FRA', 'KOR', 'ITA', 'RUS'];

const LANGUAGE_MAP = {
  english: 'en',
  spanish: 'es',
  french: 'fr',
  german: 'de',
  chinese: 'zh',
  japanese: 'ja',
  russian: 'ru',
  portuguese: 'pt',
  arabic: 'ar',
  hindi: 'hi',
  sinhala: 'si',
  tamil: 'ta'
};

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const [filterBy, setFilterBy] = useState('name');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popularCountries, setPopularCountries] = useState([]);
  const navigate = useNavigate();

  // Load popular countries
  useEffect(() => {
    const fetchPopularCountries = async () => {
      try {
        const response = await getCountriesByCodes(POPULAR_COUNTRIES);
        if (response?.data) {
          setPopularCountries(response.data);
        }
      } catch (err) {
        console.error("Failed to load popular countries", err);
      }
    };
    fetchPopularCountries();
  }, []);

  // Clear error and results when input or filter changes
  useEffect(() => {
    if (error) {
      setError(null);
      setSearchResults([]);
    }
  }, [searchTerm, filterBy]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, filterBy, region]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    navigate(`?q=${encodeURIComponent(searchTerm)}&filter=${filterBy}`, {
      replace: true
    });

    setIsLoading(true);
    setError(null);

    try {
      let response;
      const searchQuery = searchTerm.trim();

      switch (filterBy) {
        case 'name':
          response = await getCountryByName(searchQuery);
          break;
        case 'code':
          response = await getCountryByCode(searchQuery.toUpperCase());
          break;
        case 'capital':
          response = await getCountriesByCapital(searchQuery);
          break;
        case 'currency':
          response = await getCountriesByCurrency(searchQuery.toLowerCase());
          break;
        case 'language':
          const languageCode = LANGUAGE_MAP[searchQuery.toLowerCase()] || searchQuery.toLowerCase();
          response = await getCountriesByLanguage(languageCode);
          break;
        default:
          response = await getCountryByName(searchQuery);
      }

      if (!response?.data) {
        setSearchResults([]);
        setError('No results found. Please try a different search term.');
        return;
      }

      let results = Array.isArray(response.data) ? response.data : [response.data];

      results = results.filter(country => {
        if (!country) return false;
        try {
          switch (filterBy) {
            case 'name':
              return country.name?.common?.toLowerCase().includes(searchQuery.toLowerCase());
            case 'code':
              return country.cca2?.toLowerCase() === searchQuery.toLowerCase() ||
                     country.cca3?.toLowerCase() === searchQuery.toLowerCase();
            case 'capital':
              return country.capital?.some(cap =>
                cap?.toLowerCase().includes(searchQuery.toLowerCase())
              );
            case 'currency':
              const currencies = country.currencies || {};
              return Object.values(currencies).some(
                currency => currency?.name?.toLowerCase().includes(searchQuery.toLowerCase())
              );
            case 'language':
              const languages = country.languages || {};
              return Object.values(languages).some(
                lang => lang?.toLowerCase().includes(searchQuery.toLowerCase())
              );
            default:
              return true;
          }
        } catch (err) {
          return false;
        }
      });

      if (region) {
        results = results.filter(country => country.region === region);
      }

      if (results.length === 0) {
        setError('No matching countries found. Try broadening your search.');
      }

      setSearchResults(results);
    } catch (err) {
      setSearchResults([]);
      if (err.response?.status === 404) {
        setError('No countries found matching your search.');
      } else {
        setError('Failed to fetch countries. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCountryClick = (cca3) => {
    if (cca3) {
      navigate(`/country/${cca3}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Search by ${filterBy}...`}
                  className="w-full p-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="">Select Region</option>
                {['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map(reg => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {['name', 'code', 'capital', 'currency', 'language'].map(item => (
              <button
                key={item}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filterBy === item ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => {
                  setFilterBy(item);
                  setSearchTerm('');
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="transition-opacity duration-300">
          {error && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map(country => (
                <div
                  key={country?.cca3 || Math.random()}
                  onClick={() => handleCountryClick(country?.cca3)}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={country?.flags?.png || ''}
                      alt={`Flag of ${country?.name?.common || 'Unknown'}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Flag+Not+Found';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{country?.name?.common || 'Unknown Country'}</h3>
                    <div className="space-y-1 text-gray-600">
                      <p><span className="font-medium">Code:</span> {country?.cca3 || 'N/A'}</p>
                      <p><span className="font-medium">Capital:</span> {country?.capital?.[0] || 'N/A'}</p>
                      <p><span className="font-medium">Region:</span> {country?.region || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !error ? (
            <>
              <h3 className="text-xl font-medium mb-6">Popular Countries</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {popularCountries.map(country => (
                  <div
                    key={country?.cca3 || Math.random()}
                    onClick={() => handleCountryClick(country?.cca3)}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={country?.flags?.png || ''}
                        alt={`Flag of ${country?.name?.common || 'Unknown'}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Flag+Not+Found';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg">
                        {country?.name?.common || 'Unknown Country'}
                      </h3>
                      <p className="text-sm text-gray-600">{country?.cca3 || 'N/A'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}
