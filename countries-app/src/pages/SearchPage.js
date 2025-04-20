import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { 
  getCountryByName,
  getCountriesByRegion,
  getCountryByCode,
  getCountriesByCurrency,
  getCountriesByLanguage,
  getCountriesByCapital
} from '../services/countries';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('all');
  const [filterBy, setFilterBy] = useState('name');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Debounce search to prevent too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch();
      }
    }, [location.key]); 

    return () => clearTimeout(timer);
  }, [searchTerm, filterBy]);

  const handleSearch = async () => {
    navigate(`?q=${encodeURIComponent(searchTerm)}&filterBy=${filterBy}`,  {
    replace: true
  });

    setIsLoading(true);
    setError(null);
    
    try {
      let response;
      switch(filterBy) {
        case 'name':
          response = await getCountryByName(searchTerm);
          break;
        case 'code':
          response = await getCountryByCode(searchTerm);
          break;
        case 'currency':
          response = await getCountriesByCurrency(searchTerm);
          break;
        case 'language':
          response = await getCountriesByLanguage(searchTerm);
          break;
        case 'capital':
          response = await getCountriesByCapital(searchTerm);
          break;
        default:
          response = await getCountryByName(searchTerm);
      }

      let results = response.data;
      if (region !== 'all') {
        results = results.filter(country => country.region === region);
      }
      setSearchResults(results);
    } catch (err) {
      setError('Failed to fetch countries. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCountryClick = (cca3) => {
    navigate(`/country/${cca3}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8 transition-all duration-300">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder={`Search by ${filterBy}...`}
                className="w-full p-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-200"
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

          {/* Filter Options */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-3">Filter By</h2>
              <div className="flex flex-wrap gap-3">
                {['name', 'code', 'currency', 'language', 'capital'].map(item => (
                  <button
                    key={item}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filterBy === item ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setFilterBy(item)}
                  >
                    {item.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Region</label>
              <select
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="all">All Regions</option>
                {['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="transition-opacity duration-300">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center my-12">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map(country => (
                <div
                  key={country.cca3}
                  onClick={() => handleCountryClick(country.cca3)}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={country.flags.png}
                      alt={country.name.common}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{country.name.common}</h3>
                    <p className="text-gray-600">
                      <span className="font-medium">Region:</span> {country.region}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Capital:</span> {country.capital?.[0] || 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !isLoading && searchTerm && (
              <div className="text-center py-12 text-gray-500">
                No countries found matching your search.
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}