# 🌍 GEOATLAS - World Countries Explorer

Deployed URL : https://af-2-countries-app-qeai.vercel.app/

A responsive React application for exploring comprehensive country data using the REST Countries API.

## ✨ Features

- **Advanced Search**
  - By name, country code, currency, or language
  - Real-time results with debouncing
- **Smart Filtering**
  - Region filter (Africa, Americas, Asia, etc.)
  - Combined search+filter functionality
- **Detailed Country Profiles**
  - Flags, population, capital, languages
  - Currency data with symbols
  - Interactive Google Maps integration
- **UI/UX**
  - Fully responsive design
  - Loading states and error handling
  - Popular countries showcase

## 🛠 Technologies

| Category        | Technologies Used |
|-----------------|-------------------|
| Frontend        | React, Vite       |
| Styling         | Tailwind CSS      |
| Routing         | React Router v6   |
| API Client      | Axios             |
| Hosting         | Vercel            |

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/geoatlas.git

   Install dependencies:
    cd geoatlas && npm install
    
    Start the development server:
    npm run dev

🌐 API Usage
This application consumes 12+ endpoints from REST Countries API:

Endpoint	
/all	Get all countries	getAllCountries()
/name/{name}	Search by name	getCountryByName("canada")
/alpha/{code}	Get by country code	getCountryByCode("us")
/region/{region}	Filter by region	getCountriesByRegion("europe")
/currency/{currency}	Filter by currency	getCountriesByCurrency("usd")
/lang/{language}	Filter by language	getCountriesByLanguage("spanish")

📂 Project Structure
geoatlas/
├── public/            # Static assets
├── src/
│   ├── assets/        # Images/icons
│   ├── components/    # Reusable UI
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/         # Route components
│   │   ├── HomePage.jsx
│   │   ├── SearchPage.jsx
│   │   └── CountryPage.jsx
│   ├── services/      # API functions
│   │   └── countries.js
│   ├── App.jsx        # Main router
│   └── main.jsx       # Entry point
├── .gitignore
├── package.json
├── vite.config.js
└── README.md

🧪 Testing
Run unit tests:
npm run test

🚀 Deployment
Build for production:
npm run build

Deploy to Vercel:
vercel --prod

📝 Assignment Requirements Checklist
Requirement	Status
React Functional Components	✅ Implemented
REST Countries API Integration	✅ 12+ endpoints
CSS Framework (Tailwind)	✅ Fully utilized
Search/Filter Functionality	✅ Advanced implementation
Responsive Design	✅ Mobile-first approach
Git Version Control	✅ Regular commits
Documentation	✅ This README

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

Developed by Dhanushi Piyaratne
