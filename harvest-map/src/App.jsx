import React, { useState, useEffect } from 'react'; // Ensure useEffect is imported
import './index.css';
import Header from './components/Header.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import FeaturedFarms from './components/FeaturedFarms.jsx';
import Footer from './components/Footer.jsx';
// Import static data (if not yet switched to API)
import { featuredFarms as initialFarms, categories } from './data.jsx'; // Rename import to avoid confusion

export default function App() {
    // State: Store the original/API-fetched list of farms
    const [allFarms, setAllFarms] = useState(initialFarms); // Initialize with static data
    // State: Store the list of selected categories
    const [selectedCategories, setSelectedCategories] = useState([]);
    // State: Store the current value of the search input
    const [searchInput, setSearchInput] = useState('');
    // State: Store the currently active search term (used for filtering)
    const [searchTerm, setSearchTerm] = useState('');
    // State: Loading and error states (if using API)
    const [isLoading, setIsLoading] = useState(false); // Initial false as we use static data
    const [error, setError] = useState(null);

    // --- Handler Functions ---
    // Handle changes in the search input field
    const handleSearchInputChange = (value) => {
        setSearchInput(value);
        // Optional: Clear search results immediately when input is cleared
        // if (value === '') {
        //     setSearchTerm('');
        // }
    };

    // Handle search trigger (button click or Enter key)
    const handleSearch = () => {
        // Set the current input value as the active search term
        setSearchTerm(searchInput.trim()); // Trim whitespace
    };

    // --- Data Fetching (if fetching from API) ---
    // useEffect(() => {
    //     const loadFarms = async () => {
    //         setIsLoading(true);
    //         setError(null);
    //         try {
    //             // const data = await fetchFarmsFromAPI(); // Replace with your API call
    //             // setAllFarms(data);
    //             setAllFarms(initialFarms); // Temporarily use static data
    //         } catch (err) {
    //             setError(err.message || "无法加载农场数据"); // Set error message in Chinese for display
    //             setAllFarms([]);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     loadFarms();
    // }, []);

    // --- Filtering Logic ---
    // Filter farms based on selected categories and search term
    const filteredFarms = allFarms.filter(farm => {
        // 1. Category filter
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(farm.type);

        // 2. Search term filter (fuzzy search, case-insensitive)
        const term = searchTerm.toLowerCase();
        const searchMatch = searchTerm === '' ||
            farm.name.toLowerCase().includes(term) ||
            farm.location.toLowerCase().includes(term) ||
            farm.description.toLowerCase().includes(term); // Optional: search description too

        // Must satisfy both conditions
        return categoryMatch && searchMatch;
    });

    // --- Render Logic ---
    const renderContent = () => {
        if (isLoading) {
            // Can be replaced with a more sophisticated loading indicator component
            return <div style={{ textAlign: 'center', padding: '40px' }}>正在加载农场信息...</div>; // Loading message in Chinese
        }
        if (error) {
            return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>错误：{error}</div>; // Error message in Chinese
        }
        // Pass the final filtered results to FeaturedFarms
        return <FeaturedFarms farms={filteredFarms} />;
    };


    return (
        // Apply global style classes
        <div className="font-sans antialiased text-gray-900 bg-gray-50 min-h-screen">
            {/* Pass search-related state and handlers to Header */}
            <Header
                searchInput={searchInput}
                onSearchInputChange={handleSearchInputChange}
                onSearch={handleSearch}
            />

            <CategoryFilter
                categories={categories} // Pass category data
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
            />

            {/* Render the main content area based on loading/error state */}
            {renderContent()}

            <Footer />
        </div>
    );
}
