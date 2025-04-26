// File: src/components/FarmCard.jsx
import React from 'react';
import { Heart } from 'lucide-react'; // Keep Heart icon import

// Receive isFavorite status and onToggleFavorite function as props
export default function FarmCard({ farm, isFavorite, onToggleFavorite }) {

    const handleFavoriteClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        onToggleFavorite(farm.id);
    };

    return (
        <div className="card" style={{ position: 'relative' }}>
            {/* Favorite Button */}
            <button
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    border: 'none',
                    borderRadius: '50%',
                    padding: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    lineHeight: 0,
                }}
            >
                <Heart
                    size={20}
                    color={isFavorite ? '#ff0000' : '#333'}
                    fill={isFavorite ? '#ff0000' : 'none'}
                    strokeWidth={isFavorite ? 2 : 1.5}
                />
            </button>

            {/* Existing Card Content */}
            <img
                src={farm.image}
                alt={farm.name}
                className="card-img"
                style={{ display: 'block', width: '100%', height: '180px', objectFit: 'cover' }}
            />
            <div className="card-body">
                <h3>{farm.name}</h3>
                <p>{farm.location}</p>
                {/* <p>{farm.type}</p> // Removed type display */}
                <p>{farm.description}</p>
            </div>
        </div>
    );
}
