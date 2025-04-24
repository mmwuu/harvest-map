// File: src/components/FarmCard.jsx
import React from 'react';

export default function FarmCard({ farm }) {
    return (
        <div className="card">
            <img
                src={farm.image}
                alt={farm.name}
                className="card-img"
            />
            <div className="card-body">
                <h3>{farm.name}</h3>
                <p>{farm.location}</p>
                <p>{farm.type}</p>
                <p>{farm.description}</p>
            </div>
        </div>
    );
}
