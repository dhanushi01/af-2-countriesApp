export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-lg font-bold mb-2">GEOATLAS</h3>
            <p className="text-sm text-gray-300 mb-2">
              Your guide to world countries
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-2">QUICK LINKS</h4>
            <ul className="space-y-1 text-sm">
              {['Search', 'About', 'Contact'].map((item) => (
                <li key={item} className="hover:text-blue-300 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold text-sm mb-2">CONNECT</h4>
            <div className="flex space-x-3">
              {['Facebook', 'Twitter', 'Instagram'].map((platform) => (
                <span 
                  key={platform} 
                  className="bg-gray-700 hover:bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-xs"
                >
                  {platform[0]}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} GeoAtlas. All rights reserved.
        </div>
      </div>
    </footer>
  );
}