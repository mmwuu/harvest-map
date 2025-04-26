// File: src/components/FarmCard.jsx
import React from 'react';
// Import necessary icons
import { Heart, Star, MapPin as LocationIcon, Tag as ProductIcon, Clock, Award } from 'lucide-react'; // Using Award for Local Favourite

// Receive isFavorite status and onToggleFavorite function as props
// Assuming farm object now has properties like: name, location (or areaOfInterest), avgRating, reviews (need to add this), productTypes (keys), openingHours (need to add this), imageUrl, isLocalsFavourite (need to add this)
export default function FarmCard({ farm, isFavorite, onToggleFavorite }) {

    const handleFavoriteClick = (event) => {
        event.stopPropagation(); // Prevent card click event when clicking heart
        event.preventDefault(); // Prevent potential default browser behavior
        onToggleFavorite(farm.id || farm._id); // Use farm.id or farm._id (from MongoDB)
    };

    // Helper to format product types (using labels if available, otherwise keys)
    // This assumes productTypesList is available or passed down, or uses keys directly
    // For simplicity here, we'll just join the keys/labels from farm.productTypes
    const displayProductTypes = (types) => {
        if (!Array.isArray(types) || types.length === 0) {
            return 'Various products'; // Default text
        }
        // Join the first few types/labels
        return types.slice(0, 2).join(', ') + (types.length > 2 ? ', ...' : '');
    };

    // Use areaOfInterest if location doesn't exist, or prefer location if it does
    const displayLocation = farm.location || farm.areaOfInterest || 'Location unknown';
    // Use farmName if name doesn't exist
    const displayName = farm.name || farm.farmName || 'Farm Shop';
    // Use avgRating for rating
    const displayRating = farm.avgRating || 0;
    // Add mock reviews count if not available
    const reviewsCount = farm.reviews || Math.floor(Math.random() * 200) + 10; // Mock reviews
    // Add mock opening hours if not available
    const displayOpeningHours = farm.openingHours || 'Check opening times'; // Mock hours
    // Add mock isLocalsFavourite if not available
    const isLocalsFavourite = farm.isLocalsFavourite ?? (displayRating > 4.7 && reviewsCount > 50); // Mock logic

    return (
        // Add position relative and overflow hidden for badges/icons
        // Use Tailwind classes for styling
        <div className="card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer" style={{ position: 'relative' }}>

            {/* Image Container */}
            <div className="relative">
                <img
                    // Use photos array if available, otherwise fallback to image
                    src={Array.isArray(farm.photos) && farm.photos.length > 0 ? farm.photos[0][0] : farm.image || 'https://placehold.co/600x400/cccccc/ffffff?text=No+Image'}
                    alt={displayName}
                    className="w-full h-48 object-cover" // Tailwind classes for image
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }}
                />

                {/* Favorite Button */}
                <button
                    onClick={handleFavoriteClick}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5 z-10 hover:bg-white transition-colors" // Tailwind classes
                >
                    <Heart
                        size={20}
                        className={`transition-all duration-200 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-700 fill-none'}`} // Tailwind colors
                        strokeWidth={1.5}
                    />
                </button>

                {/* Local Favourite Badge - Conditional */}
                {isLocalsFavourite && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 z-10 shadow-sm">
                        <Star size={14} className="text-yellow-500 fill-yellow-400" />
                        <span className="text-xs font-semibold text-gray-800">Local Favourite</span>
                    </div>
                )}

                {/* Placeholder for image carousel dots if needed */}
                {/* <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-10">
                    <span className="block w-1.5 h-1.5 bg-white rounded-full opacity-90"></span>
                    <span className="block w-1.5 h-1.5 bg-white rounded-full opacity-50"></span>
                    <span className="block w-1.5 h-1.5 bg-white rounded-full opacity-50"></span>
                 </div> */}
            </div>

            {/* Card Body Content */}
            <div className="p-4">
                {/* Name and Rating */}
                <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-base text-gray-900 truncate" title={displayName}>{displayName}</h3>
                    {displayRating > 0 && (
                        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                            <Star size={16} className="text-yellow-500 fill-yellow-400" />
                            <span className="text-sm font-medium text-gray-800">{displayRating.toFixed(1)}</span>
                            <span className="text-sm text-gray-500">({reviewsCount})</span>
                        </div>
                    )}
                </div>

                {/* Location */}
                <p className="text-sm text-gray-600 mb-2 truncate" title={displayLocation}>
                    {/* Optional: Add location icon */}
                    {/* <LocationIcon size={14} className="inline-block mr-1 align-text-bottom" /> */}
                    {displayLocation}
                </p>

                {/* Product Types/Tags */}
                <p className="text-sm text-gray-600 mb-2 truncate" title={Array.isArray(farm.productTypes) ? farm.productTypes.join(', ') : 'Various products'}>
                    {/* Using Tag icon as placeholder */}
                    <ProductIcon size={14} className="inline-block mr-1.5 align-text-bottom text-gray-500" />
                    {displayProductTypes(farm.farmType || farm.productTypes)} {/* Display formatted types */}
                </p>

                {/* Opening Hours */}
                <p className="text-sm text-gray-600">
                    <Clock size={14} className="inline-block mr-1.5 align-text-bottom text-gray-500" />
                    {displayOpeningHours}
                </p>
            </div>
        </div>
    );
}
2