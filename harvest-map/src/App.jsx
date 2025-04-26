import React, { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header.jsx';
// import CategoryFilter from './components/CategoryFilter.jsx'; // Keep removed
import FeaturedFarms from './components/FeaturedFarms.jsx';
import Footer from './components/Footer.jsx';
// Import productTypesList as well
import { featuredFarms as initialFarms, productTypesList } from './data.jsx';

export default function App() {
    // --- State Management ---
    const [allFarms, setAllFarms] = useState(initialFarms);
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    // Add state for selected product types (using a Set for multi-select)
    const [selectedProductTypes, setSelectedProductTypes] = useState(new Set());
    const [favorites, setFavorites] = useState(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- Handlers ---
    const handleSearchInputChange = (value) => setSearchInput(value);
    const handleSearch = () => setSearchTerm(searchInput.trim());
    const handleCityOptionClick = (city) => { setSelectedCity(city); if (city !== 'Melbourne, VIC') setSelectedRegion(null); };
    const handleClearCity = () => { setSelectedCity(null); setSelectedRegion(null); };
    const handleRegionOptionClick = (region) => { if (selectedCity === 'Melbourne, VIC') setSelectedRegion(region); };
    const handleClearRegion = () => setSelectedRegion(null);
    const toggleFavorite = (farmId) => { /* ... favorite logic ... */
        setFavorites(prevFavorites => {
            const newFavorites = new Set(prevFavorites);
            if (newFavorites.has(farmId)) newFavorites.delete(farmId); else newFavorites.add(farmId);
            return newFavorites;
        });
    };

    // Handler for toggling product type selection
    const handleToggleProductType = (typeKey) => {
        setSelectedProductTypes(prevTypes => {
            const newTypes = new Set(prevTypes);
            if (newTypes.has(typeKey)) {
                newTypes.delete(typeKey); // Remove if already selected
            } else {
                newTypes.add(typeKey); // Add if not selected
            }
            console.log("[App] Selected product types:", Array.from(newTypes));
            return newTypes;
        });
    };
    // Handler to clear all product type selections
    const handleClearProductTypes = () => {
        setSelectedProductTypes(new Set());
        console.log("[App] Cleared product types");
    }


    // --- Filtering Logic ---
    console.log(`[App Filtering] City: "${selectedCity}", Region: "${selectedRegion}", Term: "${searchTerm}", Types: [${Array.from(selectedProductTypes).join(',')}]`);

    const filteredFarms = allFarms.filter(farm => {
        const farmLocation = typeof farm.location === 'string' ? farm.location.trim().toLowerCase() : '';
        const cityMatch = !selectedCity || selectedCity === 'Melbourne, VIC';
        const regionToCompare = selectedRegion ? selectedRegion.trim().toLowerCase() : null;
        const regionMatch = !regionToCompare || (selectedCity === 'Melbourne, VIC' && farmLocation === regionToCompare);

        // Product Type filter (check if farm has AT LEAST ONE of the selected types)
        const productTypeMatch = selectedProductTypes.size === 0 ||
            (farm.productTypes && farm.productTypes.some(type => selectedProductTypes.has(type)));

        const term = searchTerm.trim().toLowerCase();
        const farmName = typeof farm.name === 'string' ? farm.name.toLowerCase() : '';
        const farmDescription = typeof farm.description === 'string' ? farm.description.toLowerCase() : '';
        const searchMatch = term === '' ||
            farmName.includes(term) ||
            farmLocation.includes(term) ||
            farmDescription.includes(term);

        // Updated return statement
        return cityMatch && regionMatch && productTypeMatch && searchMatch;
    });

    // --- Render Logic ---
    const renderContent = () => {
        if (isLoading) { return <div style={{ textAlign: 'center', padding: '40px' }}>Loading farm info...</div>; }
        if (error) { return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Error: {error}</div>; }
        return <FeaturedFarms
            farms={filteredFarms}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
        />;
    };

    return (
        <div className="font-sans antialiased text-gray-900 bg-gray-50 min-h-screen">
            {/* Pass product type state and handlers down */}
            <Header
                searchInput={searchInput}
                onSearchInputChange={handleSearchInputChange}
                onSearch={handleSearch}
                selectedCity={selectedCity}
                selectedRegion={selectedRegion}
                onCitySelect={handleCityOptionClick}
                onClearCity={handleClearCity}
                onRegionSelect={handleRegionOptionClick}
                onClearRegion={handleClearRegion}
                // Product Type Props
                productTypesList={productTypesList} // Pass the list of available types
                selectedProductTypes={selectedProductTypes} // Pass the Set of selected types
                onToggleProductType={handleToggleProductType} // Pass the toggle handler
                onClearProductTypes={handleClearProductTypes} // Pass the clear handler
                // Favorites Props
                favorites={favorites}
                allFarms={allFarms} // Pass all farms for the favorites popup
            />

            {/* CategoryFilter is still removed */}

            {renderContent()}

            <Footer />
        </div>
    );
}
