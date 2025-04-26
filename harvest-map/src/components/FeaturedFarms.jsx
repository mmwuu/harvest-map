// File: src/components/FeaturedFarms.jsx
import React from 'react';
import FarmCard from './FarmCard.jsx';

// Receive favorites state and toggle function as props
export default function FeaturedFarms({ farms, favorites, onToggleFavorite }) {

    return (
        <div className="container featured-grid">
            {farms.length > 0 ? (
                // Pass favorites and onToggleFavorite down to each FarmCard
                farms.map((farm) => (
                    <FarmCard
                        key={farm.id}
                        farm={farm}
                        isFavorite={favorites.has(farm.id)} // Check if this farm is in the Set
                        onToggleFavorite={onToggleFavorite} // Pass the toggle function
                    />
                ))
            ) : (
                <p className="col-span-full text-center text-gray-500 py-10">
                    No matching farms found.
                </p>
            )}
        </div>
    );
}
