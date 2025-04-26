import React, { useState, useEffect } from 'react'; // Import useEffect
import './index.css';
import Header from './components/Header.jsx';
// import CategoryFilter from './components/CategoryFilter.jsx'; // Keep removed
import FeaturedFarms from './components/FeaturedFarms.jsx';
import Footer from './components/Footer.jsx';
// Import only productTypesList from data.jsx, remove initialFarms
import { /* featuredFarms as initialFarms, */ productTypesList } from './data.jsx';

// Define the base URL for your backend API
// Change this if your backend runs on a different port or host
const API_BASE_URL = 'http://localhost:5000'; // Use the port defined in your backend .env

export default function App() {
    // --- State Management ---
    // Initialize allFarms as empty array, will be filled by API call
    const [allFarms, setAllFarms] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedProductTypes, setSelectedProductTypes] = useState(new Set());
    const [favorites, setFavorites] = useState(new Set());
    // Add loading and error states for the API call
    const [isLoading, setIsLoading] = useState(true); // Start as true since we fetch on load
    const [error, setError] = useState(null);

    // --- Fetch Initial Farm Data ---
    useEffect(() => {
        const fetchInitialFarms = async () => {
            setIsLoading(true); // Set loading state
            setError(null); // Reset error state
            try {
                // Fetch from the backend endpoint (without filters initially)
                // Use the /api/farm-search endpoint which should return all if no params are given
                const response = await fetch(`${API_BASE_URL}/api/farm-search`);

                if (!response.ok) {
                    // Handle HTTP errors like 404 or 500
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Check if the response has the expected 'farms' array
                if (data && Array.isArray(data.farms)) {
                    setAllFarms(data.farms); // Update state with fetched farms
                    console.log("[App] Fetched initial farms:", data.farms);
                } else {
                    // Handle cases where response format is unexpected
                    console.error("Unexpected API response format:", data);
                    throw new Error("Received invalid data format from API.");
                }

            } catch (err) {
                console.error("Failed to fetch initial farms:", err);
                setError(err.message || "Could not load farm data."); // Set error state
                setAllFarms([]); // Clear farms on error
            } finally {
                setIsLoading(false); // Set loading to false after fetch attempt
            }
        };

        fetchInitialFarms(); // Call the fetch function when component mounts
    }, []); // Empty dependency array means this runs only once on mount

    // --- Handlers (Remain the same) ---
    const handleSearchInputChange = (value) => setSearchInput(value);
    const handleSearch = () => { /* ... navigation logic ... */
        const currentSearchTerm = searchInput.trim();
        const params = new URLSearchParams();
        if (selectedCity) params.append('city', selectedCity);
        if (selectedRegion) params.append('region', selectedRegion);
        if (selectedProductTypes.size > 0) params.append('productTypes', Array.from(selectedProductTypes).join(','));
        if (currentSearchTerm) params.append('q', currentSearchTerm);
        const basePath = '/farm-search-results'; // <<<--- CONFIRM/CHANGE THIS PATH
        const targetUrl = `${basePath}?${params.toString()}`;
        console.log("Navigating to:", targetUrl);
        window.location.href = targetUrl;
    };
    const handleCityOptionClick = (city) => { setSelectedCity(city); if (city !== 'Melbourne, VIC') setSelectedRegion(null); };
    const handleClearCity = () => { setSelectedCity(null); setSelectedRegion(null); };
    const handleRegionOptionClick = (region) => { if (selectedCity === 'Melbourne, VIC') setSelectedRegion(region); };
    const handleClearRegion = () => setSelectedRegion(null);
    const handleToggleProductType = (typeKey) => {
        setSelectedProductTypes(prevTypes => {
            const newTypes = new Set(prevTypes);
            if (newTypes.has(typeKey)) newTypes.delete(typeKey); else newTypes.add(typeKey);
            return newTypes;
        });
    };
    const handleClearProductTypes = () => setSelectedProductTypes(new Set());
    const toggleFavorite = (farmId) => {
        setFavorites(prevFavorites => {
            const newFavorites = new Set(prevFavorites);
            if (newFavorites.has(farmId)) newFavorites.delete(farmId); else newFavorites.add(farmId);
            return newFavorites;
        });
    };

    // --- Filtering Logic (Filters the data fetched from API) ---
    // This logic now applies to the 'allFarms' state populated by the API call
    const filteredFarms = allFarms.filter(farm => {
        const farmLocation = typeof farm.location === 'string' ? farm.location.trim().toLowerCase() : '';
        const cityMatch = !selectedCity || selectedCity === 'Melbourne, VIC';
        const regionToCompare = selectedRegion ? selectedRegion.trim().toLowerCase() : null;
        const regionMatch = !regionToCompare || (selectedCity === 'Melbourne, VIC' && farmLocation === regionToCompare);
        // Ensure farm.productTypes exists before calling .some()
        const productTypeMatch = selectedProductTypes.size === 0 || (Array.isArray(farm.productTypes) && farm.productTypes.some(type => selectedProductTypes.has(type)));
        const term = searchInput.trim().toLowerCase(); // Use searchInput for immediate filtering on landing page
        const farmName = typeof farm.name === 'string' ? farm.name.toLowerCase() : '';
        const farmDescription = typeof farm.description === 'string' ? farm.description.toLowerCase() : '';
        const searchMatch = term === '' || farmName.includes(term) || farmLocation.includes(term) || farmDescription.includes(term);
        return cityMatch && regionMatch && productTypeMatch && searchMatch;
    });

    // --- Render Logic ---
    const renderContent = () => {
        // Show loading indicator while fetching
        if (isLoading) {
            return <div style={{ textAlign: 'center', padding: '40px' }}>Loading farm info...</div>;
        }
        // Show error message if fetching failed
        if (error) {
            return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Error: {error}</div>;
        }
        // Render farms once loaded
        return <FeaturedFarms
            farms={filteredFarms}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
        />;
    };

    return (
        <div className="font-sans antialiased text-gray-900 bg-gray-50 min-h-screen">
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
                productTypesList={productTypesList} // Still needed for the dropdown options
                selectedProductTypes={selectedProductTypes}
                onToggleProductType={handleToggleProductType}
                onClearProductTypes={handleClearProductTypes}
                favorites={favorites}
                allFarms={allFarms} // Pass all fetched farms for favorites popup
            />
            {/* CategoryFilter is removed */}
            {renderContent()}
            <Footer />
        </div>
    );
}
