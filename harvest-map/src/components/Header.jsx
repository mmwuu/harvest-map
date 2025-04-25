// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react'; // Import hooks
// Removed region-specific icons (Mountain, Waves, Grape, Sun, Tree)
import { Leaf, Search, ChevronDown, MapPin, X } from 'lucide-react';

// Define region options - Removed icon property
const regionOptions = [
    { name: 'Yarra Valley' },
    { name: 'Mornington Peninsula' },
    { name: 'Dandenong Ranges' },
    { name: 'Macedon Ranges' },
    { name: 'Phillip Island' },
    { name: 'Bellarine Peninsula' },
    { name: 'Daylesford / Hepburn' },
    { name: 'Gippsland' },
    { name: 'Warburton & Upper Yarra' },
];


// Header component receives props for search functionality
export default function Header({ searchInput, onSearchInputChange, onSearch }) {
    // State for City Dropdown
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const cityDropdownRef = useRef(null);
    const cityButtonRef = useRef(null);

    // State for Region Dropdown
    const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const regionDropdownRef = useRef(null);
    const regionButtonRef = useRef(null);


    // --- City Handlers ---
    const handleCitySelectClick = () => setIsCityDropdownOpen(prevState => !prevState);
    const handleCityOptionClick = (city) => {
        setSelectedCity(city);
        setIsCityDropdownOpen(false);
        console.log("Selected city:", city);
        // TODO: Trigger filtering based on city
    };
    const handleClearCity = (event) => {
        event.stopPropagation();
        setSelectedCity(null);
        setIsCityDropdownOpen(false);
        console.log("Cleared city selection");
        // TODO: Trigger filtering update
    };

    // --- Region Handlers ---
    const handleRegionSelectClick = () => setIsRegionDropdownOpen(prevState => !prevState);
    const handleRegionOptionClick = (region) => {
        setSelectedRegion(region);
        setIsRegionDropdownOpen(false);
        console.log("Selected region:", region);
        // TODO: Trigger filtering based on region
    };
    const handleClearRegion = (event) => {
        event.stopPropagation();
        setSelectedRegion(null);
        setIsRegionDropdownOpen(false);
        console.log("Cleared region selection");
        // TODO: Trigger filtering update
    };


    // Effect to handle clicks outside the dropdowns to close them
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close City Dropdown
            if (
                cityDropdownRef.current && !cityDropdownRef.current.contains(event.target) &&
                cityButtonRef.current && !cityButtonRef.current.contains(event.target)
            ) {
                setIsCityDropdownOpen(false);
            }
            // Close Region Dropdown
            if (
                regionDropdownRef.current && !regionDropdownRef.current.contains(event.target) &&
                regionButtonRef.current && !regionButtonRef.current.contains(event.target)
            ) {
                setIsRegionDropdownOpen(false);
            }
        };

        // Add event listener if any dropdown is open
        if (isCityDropdownOpen || isRegionDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup function
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCityDropdownOpen, isRegionDropdownOpen]);


    // --- Helper Function for Dropdown Item Style ---
    const getListItemStyle = () => ({
        display: 'flex',
        alignItems: 'center',
        padding: '10px 8px',
        cursor: 'pointer',
        borderRadius: '8px',
        listStyle: 'none',
        margin: 0,
    });

    // No longer needed for regions, kept for city
    const getListItemIconContainerStyle = () => ({
        background: '#f0f0f0',
        borderRadius: '6px',
        padding: '8px',
        marginRight: '12px',
        display: 'inline-flex',
    });


    return (
        <header
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 24px',
                borderBottom: '1px solid #eee',
                background: '#fff',
                position: 'sticky',
                top: 0,
                zIndex: 100,
            }}
        >
            {/* Logo Section */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Leaf style={{ color: '#28a745', marginRight: 8, width: 24, height: 24 }} />
                <span style={{ fontSize: 24, fontWeight: 'bold', color: '#28a745' }}>
                  farmfinder
                </span>
            </div>

            {/* Search Bar Section */}
            <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ddd',
                borderRadius: 9999,
                overflow: 'visible',
            }}>
                {/* --- City Selection --- */}
                <div ref={cityButtonRef} style={{ display: 'flex', alignItems: 'center', borderRight: '1px solid #ddd', paddingRight: selectedCity ? '4px' : '0' }}>
                    <button
                        onClick={handleCitySelectClick}
                        style={{
                            background: 'transparent', border: 'none', padding: '8px 16px',
                            paddingRight: selectedCity ? '8px' : '16px', fontWeight: 600, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '4px',
                        }}
                    >
                        {selectedCity ? selectedCity.split(',')[0] : 'City'}
                        {!selectedCity && <ChevronDown size={16} />}
                    </button>
                    {selectedCity && (
                        <button
                            onClick={handleClearCity} aria-label="Clear city selection"
                            style={{
                                background: '#eee', border: 'none', borderRadius: '50%', padding: '2px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', marginLeft: '4px',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ddd'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#eee'}
                        >
                            <X size={12} color="#555" />
                        </button>
                    )}
                </div>
                {/* City Dropdown Menu */}
                {isCityDropdownOpen && (
                    <div ref={cityDropdownRef} style={{
                        position: 'absolute', top: '110%', left: '0px', minWidth: '250px',
                        background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        zIndex: 110, padding: '16px', border: '1px solid #eee',
                    }}>
                        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold' }}>Suggested destinations</h4>
                        <ul>
                            <li
                                onClick={() => handleCityOptionClick('Melbourne, VIC')}
                                style={getListItemStyle()}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f7f7f7'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <div style={{...getListItemIconContainerStyle(), background: '#fdecec'}}>
                                    <MapPin size={20} color="#d9534f" />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '500', fontSize: '15px' }}>Melbourne, VIC</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                )}

                {/* --- Region Selection --- */}
                <div ref={regionButtonRef} style={{ display: 'flex', alignItems: 'center', borderRight: '1px solid #ddd', paddingRight: selectedRegion ? '4px' : '0' }}>
                    <button
                        onClick={handleRegionSelectClick}
                        style={{
                            background: 'transparent', border: 'none', padding: '8px 16px',
                            paddingRight: selectedRegion ? '8px' : '16px', fontWeight: 600, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '4px',
                        }}
                    >
                        {selectedRegion || 'Region'}
                        {!selectedRegion && <ChevronDown size={16} />}
                    </button>
                    {selectedRegion && (
                        <button
                            onClick={handleClearRegion} aria-label="Clear region selection"
                            style={{
                                background: '#eee', border: 'none', borderRadius: '50%', padding: '2px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', marginLeft: '4px',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ddd'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#eee'}
                        >
                            <X size={12} color="#555" />
                        </button>
                    )}
                </div>
                {/* Region Dropdown Menu */}
                {isRegionDropdownOpen && (
                    <div ref={regionDropdownRef} style={{
                        position: 'absolute', top: '110%', left: '80px', // Adjust left position if necessary
                        minWidth: '280px', background: '#fff', borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', zIndex: 110,
                        padding: '16px', border: '1px solid #eee', maxHeight: '400px', overflowY: 'auto'
                    }}>
                        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold' }}>Select a Region</h4>
                        <ul style={{padding: 0}}>
                            {regionOptions.map((region) => ( // Removed icon logic here
                                <li
                                    key={region.name}
                                    onClick={() => handleRegionOptionClick(region.name)}
                                    style={getListItemStyle()} // Use helper for style
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f7f7f7'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    {/* Removed icon container div */}
                                    <div>
                                        <div style={{ fontWeight: '500', fontSize: '15px' }}>{region.name}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}


                {/* --- Search Input & Button --- */}
                <input
                    type="text" placeholder="Search farms…" value={searchInput}
                    onChange={e => onSearchInputChange(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') onSearch(); }}
                    style={{
                        flex: 1, border: 'none', outline: 'none', padding: '8px 16px',
                        fontSize: 14, color: '#333', minWidth: '150px',
                    }}
                />
                <button
                    onClick={onSearch} aria-label="Search"
                    style={{
                        width: 32, height: 32, margin: '0 8px 0 4px', background: '#28a745',
                        border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', cursor: 'pointer', color: '#fff',
                    }}
                >
                    <Search style={{ width: 16, height: 16 }} />
                </button>
            </div>

            {/* Placeholder for User Menu */}
            <div>
                {/* <button>Login</button> */}
            </div>
        </header>
    );
}
