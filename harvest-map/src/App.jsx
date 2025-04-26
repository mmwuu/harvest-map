import React, { useState, useEffect } from 'react'; // Import useEffect
import './index.css';
import Header from './components/Header.jsx';
// import CategoryFilter from './components/CategoryFilter.jsx'; // Keep removed
import FeaturedFarms from './components/FeaturedFarms.jsx';
import Footer from './components/Footer.jsx';
// Import only productTypesList from data.jsx, remove initialFarms
import { /* featuredFarms as initialFarms, */ productTypesList } from './data.jsx'; // Assuming data.jsx still exports productTypesList

// Define the base URL for your backend API
// Ensure this matches where your backend is running (PORT 8000 based on curl)
const API_BASE_URL = 'http://localhost:8000';

export default function App() {
    // --- State Management ---
    const [allFarms, setAllFarms] = useState([]); // Initialize as empty array
    const [searchInput, setSearchInput] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedProductTypes, setSelectedProductTypes] = useState(new Set());
    const [favorites, setFavorites] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true); // Start loading on mount
    const [error, setError] = useState(null); // State to hold fetch errors

    // --- Fetch Initial Farm Data ---
    useEffect(() => {
        const fetchInitialFarms = async () => {
            setIsLoading(true); // Set loading state
            setError(null); // Reset error state
            // Use the combined search endpoint without filters to get all farms initially
            const fetchUrl = `${API_BASE_URL}/api/farm-search`;
            console.log(`[App] Attempting to fetch initial farms from ${fetchUrl}`); // Log fetch attempt
            try {
                const response = await fetch(fetchUrl);
                console.log("[App] Fetch response status:", response.status); // Log response status

                if (!response.ok) {
                    // Try to get more specific error from response body if possible
                    let errorBody = `Failed to fetch initial farm data (${response.status})`;
                    try {
                        const errData = await response.json();
                        errorBody = errData.error || `HTTP error! status: ${response.status}`;
                    } catch (e) { /* Ignore parsing error if response is not JSON */ }
                    throw new Error(errorBody);
                }

                const data = await response.json();
                console.log("[App] Raw API response data:", data); // Log raw data

                // Check the structure of the received data (expecting { farms: [...] })
                if (data && Array.isArray(data.farms)) {
                    setAllFarms(data.farms); // Update state with fetched farms
                    console.log("[App] Successfully fetched and set initial farms:", data.farms.length);
                } else {
                    console.error("[App] Unexpected API response format:", data);
                    throw new Error("Received invalid data format from API.");
                }

            } catch (err) {
                console.error("[App] Failed to fetch initial farms:", err);
                setError(err.message || "Could not load farm data."); // Set specific error message
                setAllFarms([]); // Clear farms on error
            } finally {
                setIsLoading(false); // Ensure loading is set to false
                console.log("[App] Fetch attempt finished."); // Log fetch end
            }
        };

        fetchInitialFarms(); // Call the fetch function when component mounts
    }, []); // Empty dependency array ensures this runs only once on mount

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

    // --- Filtering Logic (Applies to fetched data for display on this page) ---
    const filteredFarms = allFarms.filter(farm => {
        const farmLocation = typeof farm.areaOfInterest === 'string' ? farm.areaOfInterest.trim().toLowerCase() : '';
        const cityMatch = !selectedCity || selectedCity === 'Melbourne, VIC';
        const regionToCompare = selectedRegion ? selectedRegion.trim().toLowerCase() : null;
        const regionMatch = !regionToCompare || (selectedCity === 'Melbourne, VIC' && farmLocation === regionToCompare);
        const productTypeMatch = selectedProductTypes.size === 0 ||
            (Array.isArray(farm.farmType) &&
                farm.farmType.some(backendLabel => {
                    const matchingType = Array.isArray(productTypesList)
                        ? productTypesList.find(pt => pt.label === backendLabel)
                        : null;
                    return matchingType && selectedProductTypes.has(matchingType.key);
                }));
        const term = searchInput.trim().toLowerCase();
        const farmName = typeof farm.farmName === 'string' ? farm.farmName.toLowerCase() : '';
        const farmDescription = typeof farm.description === 'string' ? farm.description.toLowerCase() : '';
        const searchMatch = term === '' || farmName.includes(term) || farmLocation.includes(term) || farmDescription.includes(term);
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
                productTypesList={productTypesList}
                selectedProductTypes={selectedProductTypes}
                onToggleProductType={handleToggleProductType}
                onClearProductTypes={handleClearProductTypes}
                favorites={favorites}
                allFarms={allFarms}
            />
            {renderContent()}
            <Footer />
        </div>
    );
}

// Ensure App component is exported as default

