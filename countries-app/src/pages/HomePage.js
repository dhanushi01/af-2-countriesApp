export default function HomePage() {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to GEOATLAS</h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore comprehensive information about countries worldwide
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Discover Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Country Search', desc: 'Find any country by name, code, or region' },
              { title: 'Detailed Info', desc: 'View population, languages, currencies and more' },
              { title: 'Interactive Maps', desc: 'Coming soon: Visual geographical data' }
            ].map((feature, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-blue-700">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
          
          {/* World Map Image */}
          <div className="mt-10">
            <img 
              src="https://www.countryreports.org/new-index-assets/images/hp-container-one-map.png" 
              alt="World Map" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </main>
  );
}