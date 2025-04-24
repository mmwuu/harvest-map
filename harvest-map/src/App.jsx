import React, { useState } from 'react';
import './index.css';
import Header from './components/Header.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import FeaturedFarms from './components/FeaturedFarms.jsx';
import Footer from './components/Footer.jsx';
import { featuredFarms, categories } from './data.jsx';

export default function App() {
    // 存储已选择的类别列表，初始为空数组 → 默认显示所有农场
    const [selectedCategories, setSelectedCategories] = useState([]);

    return (
        <div className="font-sans antialiased text-gray-900 bg-gray-50 min-h-screen">
            <Header />

            <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
            />

            <FeaturedFarms
                farms={featuredFarms}
                selectedCategories={selectedCategories}
            />

            <Footer />
        </div>
    );
}
