// File: src/components/FeaturedFarms.jsx
import React from 'react';
import FarmCard from './FarmCard.jsx';

// Component now only receives the final filtered list of farms
export default function FeaturedFarms({ farms }) {

    return (
        // Use container class for width limiting and centering (if defined in index.css)
        // Or use Tailwind classes directly: <div className="container mx-auto px-4 py-8">
        // Ensure the 'featured-grid' class is applied for grid layout
        <div className="container featured-grid">
            {farms.length > 0 ? (
                // Map over the received farms and render a FarmCard for each
                farms.map((farm) => (
                    <FarmCard key={farm.id} farm={farm} />
                ))
            ) : (
                // Display a message in English if no farms match the criteria
                <p className="col-span-full text-center text-gray-500 py-10">
                    No matching farms found.
                </p>
            )}
        </div>
    );
}
