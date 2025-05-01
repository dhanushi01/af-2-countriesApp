
import abt1 from '../assets/abt1.jpeg';
import abt2 from '../assets/abt2.jpeg';
import abt3 from '../assets/abt3.jpeg';

export default function AboutPage() {
  return (
    <main className="flex-grow container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">What GEOATLAS Does</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your all-in-one toolkit for exploring world countries
          </p>
        </div>

        {/* Feature 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src={abt1} 
              alt="Search interface" 
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Smart Search</h2>
            <p className="text-gray-600 mb-4">
              Find any country by name, code, currency, or even language. Our lightning-fast 
              search delivers accurate results instantly.
            </p>
            <div className="space-y-2">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                Name Search
              </span>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                Code Lookup
              </span>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                Currency Filter
              </span>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="md:order-2">
            <img 
              src={abt2} 
              alt="Country details" 
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div className="md:order-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Detailed Country Profiles</h2>
            <p className="text-gray-600 mb-4">
              Get comprehensive information at a glance - population, languages, 
              currencies, timezones, and more.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Interactive maps and flag displays</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Historical and cultural insights</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Regional comparisons</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-blue-50 rounded-xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src={abt3} 
                alt="Data visualization" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Visualization</h2>
              <p className="text-gray-600 mb-4">
              Complex statistics transformed into beautiful, easy-to-understand charts and graphs.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Population Trends',
                  'Economic Data',
                  'Language Maps',
                  'Regional Stats'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <span className="bg-white p-2 rounded-full mr-2">
                      <span className="text-blue-500">✓</span>
                    </span>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="text-center bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Explore?</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Start discovering countries with our powerful tools today. Perfect for students, 
            travelers, and geography enthusiasts.
          </p>
        </div>
      </div>
    </main>
  );
}
