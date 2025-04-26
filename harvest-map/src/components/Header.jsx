// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Leaf, Search, ChevronDown, MapPin, X, Heart, CheckSquare, Square } from 'lucide-react';

// Define region options
const regionOptions = [
    { name: 'Yarra Valley' }, { name: 'Mornington Peninsula' },
    { name: 'Dandenong Ranges' }, { name: 'Macedon Ranges' },
    { name: 'Phillip Island' }, { name: 'Bellarine Peninsula' },
    { name: 'Daylesford / Hepburn' }, { name: 'Gippsland' },
    { name: 'Warburton & Upper Yarra' },
];

// Header component receives props for all filters and favorites
export default function Header({
                                   searchInput, onSearchInputChange, onSearch,
                                   selectedCity, selectedRegion,
                                   onCitySelect, onClearCity,
                                   onRegionSelect, onClearRegion,
                                   productTypesList, selectedProductTypes, onToggleProductType, onClearProductTypes,
                                   favorites, allFarms // Keep favorites props
                               }) {
    // Local UI State for Dropdowns/Popups
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
    const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
    const [isProductTypeDropdownOpen, setIsProductTypeDropdownOpen] = useState(false);
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false); // Keep favorites state

    // Refs
    const cityDropdownRef = useRef(null);
    const cityButtonRef = useRef(null);
    const regionDropdownRef = useRef(null);
    const regionButtonRef = useRef(null);
    const productTypeDropdownRef = useRef(null);
    const productTypeButtonRef = useRef(null);
    const favoritesPopupRef = useRef(null); // Keep favorites ref
    const favoritesButtonRef = useRef(null); // Keep favorites ref


    // Local UI Handlers
    const handleCityButtonClick = () => setIsCityDropdownOpen(prev => !prev);
    const handleRegionButtonClick = () => { if (selectedCity === 'Melbourne, VIC') setIsRegionDropdownOpen(prev => !prev); else setIsRegionDropdownOpen(true); };
    const handleProductTypeButtonClick = () => setIsProductTypeDropdownOpen(prev => !prev);
    const handleFavoritesClick = () => setIsFavoritesOpen(prev => !prev); // Keep favorites handler

    // Handlers that call props from App
    const handleCityOptionClick = (city) => { onCitySelect(city); setIsCityDropdownOpen(false); };
    const handleClearCityClick = (event) => { event.stopPropagation(); onClearCity(); setIsCityDropdownOpen(false); setIsRegionDropdownOpen(false); setIsProductTypeDropdownOpen(false); };
    const handleRegionOptionClick = (region) => { onRegionSelect(region); setIsRegionDropdownOpen(false); };
    const handleClearRegionClick = (event) => { event.stopPropagation(); onClearRegion(); setIsRegionDropdownOpen(false); };
    const handleClearProductTypesClick = (event) => { event.stopPropagation(); onClearProductTypes(); };

    // Effect to handle clicks outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target) && cityButtonRef.current && !cityButtonRef.current.contains(event.target)) setIsCityDropdownOpen(false);
            if (regionDropdownRef.current && !regionDropdownRef.current.contains(event.target) && regionButtonRef.current && !regionButtonRef.current.contains(event.target)) setIsRegionDropdownOpen(false);
            if (productTypeDropdownRef.current && !productTypeDropdownRef.current.contains(event.target) && productTypeButtonRef.current && !productTypeButtonRef.current.contains(event.target)) setIsProductTypeDropdownOpen(false);
            if (favoritesPopupRef.current && !favoritesPopupRef.current.contains(event.target) && favoritesButtonRef.current && !favoritesButtonRef.current.contains(event.target)) setIsFavoritesOpen(false); // Keep favorites check
        };
        if (isCityDropdownOpen || isRegionDropdownOpen || isProductTypeDropdownOpen || isFavoritesOpen) { // Keep favorites check
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isCityDropdownOpen, isRegionDropdownOpen, isProductTypeDropdownOpen, isFavoritesOpen]); // Keep favorites dependency

    // Helper Functions
    const getListItemStyle = () => ({ display: 'flex', alignItems: 'center', padding: '8px', cursor: 'pointer', borderRadius: '6px', listStyle: 'none', margin: '0 0 4px 0' });
    const getListItemIconContainerStyle = () => ({ background: '#f0f0f0', borderRadius: '6px', padding: '8px', marginRight: '12px', display: 'inline-flex' });
    const getProductTypeButtonText = () => {
        if (!selectedProductTypes || selectedProductTypes.size === 0) return 'Product Type'; // Added null check for safety
        if (selectedProductTypes.size === 1) {
            const selectedKey = Array.from(selectedProductTypes)[0];
            // Ensure productTypesList is available before finding
            const selectedType = productTypesList?.find(type => type.key === selectedKey);
            return selectedType ? selectedType.label : selectedKey;
        }
        return `${selectedProductTypes.size} Types`;
    };

    // Get favorite farm objects (ensure allFarms and favorites are passed)
    const favoriteFarms = allFarms && favorites ? allFarms.filter(farm => favorites.has(farm.id)) : [];


    return (
        <header style={{ width: '100%', padding: '16px 0', borderBottom: '1px solid #eee', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
            {/* Inner container: controls content width and centering */}
            <div style={{
                width: '90%',
                maxWidth: '1200px',
                margin: '0 auto', // Center horizontally
                display: 'flex',
                alignItems: 'center',
            }}>

                {/* Logo Section - Takes up 1 part of flexible space */}
                <div style={{ display: 'flex', alignItems: 'center', flex: '1 0 0' }}>
                    <Leaf style={{ color: '#28a745', marginRight: 8, width: 24, height: 24 }} />
                    <span style={{ fontSize: 24, fontWeight: 'bold', color: '#28a745' }}>
                      farmfinder
                    </span>
                </div>

                {/* Search Bar Section - Takes its natural width, can shrink, centered */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #ddd',
                    borderRadius: 9999,
                    overflow: 'visible',
                    flex: '0 1 auto',
                    margin: '0 16px',
                }}>
                    {/* --- City Selection --- */}
                    <div ref={cityButtonRef} style={{ position:'relative', display: 'flex', alignItems: 'center', borderRight: '1px solid #ddd', paddingRight: selectedCity ? '4px' : '0' }}>
                        <button onClick={handleCityButtonClick} style={{ background: 'transparent', border: 'none', padding: '8px 16px', paddingRight: selectedCity ? '8px' : '16px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {selectedCity ? selectedCity.split(',')[0] : 'City'}
                            {!selectedCity && <ChevronDown size={16} />}
                        </button>
                        {selectedCity && <button onClick={handleClearCityClick} aria-label="Clear city selection" style={{ background: '#eee', border: 'none', borderRadius: '50%', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: '4px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ddd'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#eee'}><X size={12} color="#555" /></button>}
                        {/* Restored City Dropdown Content */}
                        {isCityDropdownOpen && (
                            <div ref={cityDropdownRef} style={{ position: 'absolute', top: '110%', left: '0px', minWidth: '250px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', zIndex: 110, padding: '16px', border: '1px solid #eee' }}>
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
                    </div>

                    {/* --- Region Selection --- */}
                    <div ref={regionButtonRef} style={{ position:'relative', display: 'flex', alignItems: 'center', borderRight: '1px solid #ddd', paddingRight: selectedRegion ? '4px' : '0' }}>
                        <button onClick={handleRegionButtonClick} disabled={selectedCity !== 'Melbourne, VIC'} style={{ background: 'transparent', border: 'none', padding: '8px 16px', paddingRight: selectedRegion ? '8px' : '16px', fontWeight: 600, cursor: selectedCity === 'Melbourne, VIC' ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '4px', opacity: selectedCity === 'Melbourne, VIC' ? 1 : 0.5 }}>
                            {selectedRegion || 'Region'}
                            {selectedCity === 'Melbourne, VIC' && !selectedRegion && <ChevronDown size={16} />}
                        </button>
                        {selectedRegion && <button onClick={handleClearRegionClick} aria-label="Clear region selection" style={{ background: '#eee', border: 'none', borderRadius: '50%', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: '4px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ddd'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#eee'}><X size={12} color="#555" /></button>}
                        {/* Restored Region Dropdown Content */}
                        {isRegionDropdownOpen && (
                            <div ref={regionDropdownRef} style={{ position: 'absolute', top: '110%', left: '0px', minWidth: '280px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', zIndex: 110, padding: '16px', border: '1px solid #eee', maxHeight: '400px', overflowY: 'auto' }}>
                                {selectedCity === 'Melbourne, VIC' ? (
                                    <>
                                        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold' }}>Select a Region</h4>
                                        <ul style={{padding: 0}}>
                                            {regionOptions.map((region) => (
                                                <li
                                                    key={region.name}
                                                    onClick={() => handleRegionOptionClick(region.name)}
                                                    style={getListItemStyle()}
                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f7f7f7'}
                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                    <div>
                                                        <div style={{ fontWeight: '500', fontSize: '15px' }}>{region.name}</div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <p style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>Please select Melbourne first.</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* --- Product Type Selection --- */}
                    <div ref={productTypeButtonRef} style={{ position:'relative', display: 'flex', alignItems: 'center', borderRight: '1px solid #ddd', paddingRight: selectedProductTypes?.size > 0 ? '4px' : '0' }}> {/* Added null check */}
                        <button onClick={handleProductTypeButtonClick} style={{ background: 'transparent', border: 'none', padding: '8px 16px', paddingRight: selectedProductTypes?.size > 0 ? '8px' : '16px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {getProductTypeButtonText()}
                            {(!selectedProductTypes || selectedProductTypes.size === 0) && <ChevronDown size={16} />} {/* Added null check */}
                        </button>
                        {selectedProductTypes?.size > 0 && <button onClick={handleClearProductTypesClick} aria-label="Clear product type selection" style={{ background: '#eee', border: 'none', borderRadius: '50%', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: '4px' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ddd'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#eee'}><X size={12} color="#555" /></button>} {/* Added null check */}
                        {/* Restored Product Type Dropdown Content */}
                        {isProductTypeDropdownOpen && (
                            <div ref={productTypeDropdownRef} style={{ position: 'absolute', top: '110%', left: '0px', minWidth: '240px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', zIndex: 110, padding: '16px', border: '1px solid #eee', maxHeight: '400px', overflowY: 'auto' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <h4 style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>Product Types</h4>
                                    <button onClick={handleClearProductTypesClick} style={{ fontSize: '12px', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', padding: 0 }}>Clear</button>
                                </div>
                                <ul style={{padding: 0, margin: 0, listStyle: 'none'}}>
                                    {/* Ensure productTypesList is passed and is an array */}
                                    {productTypesList?.map((type) => {
                                        const isSelected = selectedProductTypes?.has(type.key); // Add null check
                                        return (
                                            <li
                                                key={type.key}
                                                onClick={() => onToggleProductType(type.key)} // Call prop directly
                                                style={getListItemStyle()}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f7f7f7'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                {isSelected ? <CheckSquare size={18} color="#28a745" style={{ marginRight: '8px' }} /> : <Square size={18} color="#ccc" style={{ marginRight: '8px' }} />}
                                                <span style={{ fontSize: '14px', fontWeight: isSelected ? '500' : 'normal' }}>{type.label}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* --- Search Input & Button --- */}
                    <input type="text" placeholder="Search farms…" value={searchInput} onChange={e => onSearchInputChange(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') onSearch(); }} style={{ flex: 1, border: 'none', outline: 'none', padding: '8px 16px', fontSize: 14, color: '#333', minWidth: '150px' }}/>
                    <button onClick={onSearch} aria-label="Search" style={{ width: 32, height: 32, margin: '0 8px 0 4px', background: '#28a745', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}><Search style={{ width: 16, height: 16 }} /></button>
                </div>

                {/* Placeholder for User Menu - Takes up 1 part of flexible space, content aligned right */}
                <div style={{ flex: '1 0 0', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' /* Added align-items */ }}>
                    {/* Favorites Button */}
                    <button ref={favoritesButtonRef} onClick={handleFavoritesClick} aria-label="Show favorites" style={{ background: 'transparent', border: 'none', padding: '8px', marginRight: '16px', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Heart size={22} color="#555" fill={favorites?.size > 0 ? "#f0f0f0" : "none"} /> {/* Added null check */}
                        {favorites?.size > 0 && <span style={{ position: 'absolute', top: '0px', right: '0px', background: '#d9534f', color: 'white', borderRadius: '50%', padding: '1px 5px', fontSize: '10px', fontWeight: 'bold', lineHeight: '1', minWidth: '16px', textAlign: 'center' }}>{favorites.size}</span>} {/* Added null check */}
                    </button>
                    {/* Favorites Popup */}
                    {isFavoritesOpen && (
                        <div ref={favoritesPopupRef} style={{ position: 'absolute', top: 'calc(100% + 10px)', /* Position below header */ right: '0px', minWidth: '250px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', zIndex: 110, padding: '16px', border: '1px solid #eee', maxHeight: '400px', overflowY: 'auto' }}>
                            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold' }}>Your Favorites</h4>
                            {favoriteFarms.length > 0 ? (
                                <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                                    {favoriteFarms.map(farm => (
                                        <li key={farm.id} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                                            <div style={{ fontSize: '14px', fontWeight: '500' }}>{farm.name}</div>
                                            <div style={{ fontSize: '12px', color: '#666' }}>{farm.location}</div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', margin: '10px 0' }}>You haven't favorited any farms yet.</p>
                            )}
                        </div>
                    )}

                    {/* User Menu Placeholder Content */}
                    <div>{/* <button>Login</button> */}</div>
                </div>

            </div> {/* End of inner container */}
        </header>
    );
}
