import { Link } from 'react-router-dom';
import FacebookIcon from '../assets/facebook.webp';
import TwitterIcon from '../assets/twitter.webp';
import InstagramIcon from '../assets/instagram.png';

export default function Footer() {
  const socialMedia = [
    { name: 'Facebook', icon: FacebookIcon, url: 'https://facebook.com' },
    { name: 'Twitter', icon: TwitterIcon, url: 'https://twitter.com' },
    { name: 'Instagram', icon: InstagramIcon, url: 'https://instagram.com' }
  ];

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
              <li>
                <Link 
                  to="/" 
                  className="hover:text-blue-300 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/search" 
                  className="hover:text-blue-300 transition-colors"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="hover:text-blue-300 transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold text-sm mb-2">CONNECT</h4>
            <div className="flex space-x-3">
              {socialMedia.map((platform) => (
                <a 
                  key={platform.name}
                  href={platform.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <img 
                    src={platform.icon} 
                    alt={platform.name} 
                    className="w-4 h-4 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} GEOATLAS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}