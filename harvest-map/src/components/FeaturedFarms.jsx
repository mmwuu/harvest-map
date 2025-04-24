import React from 'react';
import FarmCard from './FarmCard.jsx';

export default function FeaturedFarms({ farms, selectedCategories }) {
    // 如果没有选任何类别，则显示所有 farms；否则只显示类型在 selectedCategories 里的
    const farmsToShow =
        selectedCategories.length === 0
            ? farms
            : farms.filter(f => selectedCategories.includes(f.type));

    return (
        <div className="container featured-grid">
            {farmsToShow.length > 0 ? (
                farmsToShow.map(farm => (
                    <FarmCard key={farm.id} farm={farm} />
                ))
            ) : (
                <p className="col-span-full text-center text-gray-500 py-10">
                    没有找到符合筛选条件的农场。
                </p>
            )}
        </div>
    );
}
