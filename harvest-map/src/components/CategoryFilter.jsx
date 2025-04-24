/* src/components/CategoryFilter.jsx */
import React from 'react';
import { Leaf, Apple, Milk, Grape, Home, Tractor, X } from 'lucide-react';
import './CategoryFilter.css';

export default function CategoryFilter({
                                           categories,
                                           selectedCategories,
                                           setSelectedCategories
                                       }) {
    const handleCategoryClick = (name) => {
        setSelectedCategories(prev =>
            prev.includes(name)
                ? prev.filter(c => c !== name)
                : [...prev, name]
        );
    };

    return (
        <div className="category-filter">
            {categories.map(cat => {
                const isActive = selectedCategories.includes(cat.name);
                return (
                    <button
                        key={cat.name}
                        className={isActive ? 'active' : ''}
                        onClick={() => handleCategoryClick(cat.name)}
                    >
                        <cat.icon />
                        <span>{cat.name}</span>
                        {isActive && <X style={{ width:12, height:12 }} />}
                    </button>
                );
            })}
        </div>
    );
}
