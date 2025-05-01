import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../services/countries';

export default function CountryPage() {
  const { cca3 } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await getCountryByCode(cca3);
        setCountry(response.data[0]);
      } catch (err) {
        setError('Failed to load country data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [cca3]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!country) return <div className="text-center py-12">Country not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Search
        </button>

        {/* Country Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
          <div className="flex-shrink-0">
            <img 
              src={country.flags.png} 
              alt={`Flag of ${country.name.common}`} 
              className="w-full max-w-xs border border-gray-200 rounded-lg shadow-md"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {country.name.common}
            </h1>
            <h2 className="text-xl text-gray-600 mb-4">
              {country.name.official}
            </h2>
            <div className="flex flex-wrap gap-2">
              {country.cca2 && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {country.cca2}
                </span>
              )}
              {country.cca3 && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {country.cca3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Country Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
              Basic Information
            </h3>
            <div className="space-y-3">
              <p>
                <span className="font-medium text-gray-700">Capital:</span> 
                <span className="ml-2">
                  {country.capital?.join(', ') || 'N/A'}
                </span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Region:</span> 
                <span className="ml-2">{country.region}</span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Subregion:</span> 
                <span className="ml-2">{country.subregion || 'N/A'}</span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Population:</span> 
                <span className="ml-2">
                  {country.population.toLocaleString()}
                </span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Area:</span> 
                <span className="ml-2">
                  {country.area?.toLocaleString() || 'N/A'} km²
                </span>
              </p>
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
              Languages
            </h3>
            <div className="space-y-2">
              {country.languages ? (
                Object.entries(country.languages).map(([code, name]) => (
                  <p key={code}>
                    <span className="font-medium text-gray-700">{code}:</span> 
                    <span className="ml-2">{name}</span>
                  </p>
                ))
              ) : (
                <p>No language data available</p>
              )}
            </div>
          </div>

          {/* Currencies */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
              Currencies
            </h3>
            <div className="space-y-2">
              {country.currencies ? (
                Object.entries(country.currencies).map(([code, currency]) => (
                  <p key={code}>
                    <span className="font-medium text-gray-700">{code}:</span> 
                    <span className="ml-2">
                      {currency.name} ({currency.symbol || 'No symbol'})
                    </span>
                  </p>
                ))
              ) : (
                <p>No currency data available</p>
              )}
            </div>
          </div>

          {/* Timezones */}
          {country.timezones && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                Timezones
              </h3>
              <div className="flex flex-wrap gap-2">
                {country.timezones.map((tz, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tz}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Map */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
              Location
            </h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
              {country.latlng && (
                <iframe
                  title={`Map of ${country.name.common}`}
                  src={`https://maps.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&z=5&output=embed`}
                  className="w-full h-64 border-0"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}