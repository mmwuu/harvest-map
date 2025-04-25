// src/components/Header.jsx
import React from 'react';
import { Leaf, Search } from 'lucide-react';

// Header component receives props for search functionality
export default function Header({ searchInput, onSearchInputChange, onSearch }) {
    return (
        <header
            // It's recommended to use CSS classes from index.css instead of inline styles
            // className="header container"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 24px',
                borderBottom: '1px solid #eee',
                background: '#fff',
                // Add position: 'sticky', top: 0, zIndex: 100 if needed
            }}
        >
            {/* Logo Section */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Leaf style={{ color: '#28a745', marginRight: 8, width: 24, height: 24 }} />
                <span style={{ fontSize: 24, fontWeight: 'bold', color: '#28a745' }}>
                  FarmFinder
                </span>
            </div>

            {/* Search Bar Section */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ddd',
                borderRadius: 9999,
                overflow: 'visible',
            }}>
                {/* Static buttons */}
                <button
                    style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '8px 16px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        borderRight: '1px solid #ddd',
                    }}
                >
                    Anywhere
                </button>
                <button
                    style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '8px 16px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        borderRight: '1px solid #ddd',
                    }}
                >
                    Any Produce
                </button>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search farms…"
                    value={searchInput} // Bind value to prop from App
                    onChange={e => onSearchInputChange(e.target.value)} // Call handler from App on change
                    onKeyDown={e => { if (e.key === 'Enter') onSearch(); }} // Call search handler from App on Enter
                    style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        padding: '8px 16px',
                        fontSize: 14,
                        color: '#333',
                        minWidth: '150px',
                    }}
                />
                {/* Search Icon Button */}
                <button
                    onClick={onSearch} // Call search handler from App on click
                    style={{
                        width: 32,
                        height: 32,
                        margin: '0 8px 0 4px',
                        background: '#28a745',
                        border: 'none',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#fff',
                    }}
                    aria-label="Search"
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
