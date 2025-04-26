// File: src/data.jsx

// Define available product types for the filter dropdown
export const productTypesList = [
    { key: 'vegetables', label: 'Vegetables' },
    { key: 'fruits', label: 'Fruits' },
    { key: 'dairy', label: 'Dairy & Cheese' },
    { key: 'meat', label: 'Meat & Poultry' },
    { key: 'wine', label: 'Wine & Cider' },
    { key: 'honey', label: 'Honey & Preserves' },
    { key: 'eggs', label: 'Eggs' },
    { key: 'flowers', label: 'Flowers & Plants' },
    { key: 'other', label: 'Other' }, // Added 'Other' option
];

// Updated featuredFarms: added 'productTypes' array property
// You might want to add 'other' to some farms if applicable
export const featuredFarms = [
    {
        id: 1,
        name: 'Yarra Valley Organics',
        location: 'Yarra Valley',
        productTypes: ['vegetables', 'honey', 'eggs'],
        image: 'https://placehold.co/600x400/a2d9a1/333333?text=Yarra+Valley+Veggies',
        description: 'Fresh, seasonal organic produce from the Yarra Valley.',
    },
    {
        id: 2,
        name: 'Peninsula Orchard Fruits',
        location: 'Mornington Peninsula',
        productTypes: ['fruits', 'cider', 'honey'], // Using 'cider' for 'wine' key for now
        image: 'https://placehold.co/600x400/f8c471/333333?text=Peninsula+Orchard',
        description: 'Pick your own apples, cherries, and berries on the Peninsula.',
    },
    {
        id: 3,
        name: 'Dandenong Dairy Delights',
        location: 'Dandenong Ranges',
        productTypes: ['dairy', 'eggs'],
        image: 'https://placehold.co/600x400/aed6f1/333333?text=Dandenong+Dairy',
        description: 'Award-winning cheeses and fresh milk from the Ranges.',
    },
    {
        id: 4,
        name: 'Macedon Ranges Vineyard',
        location: 'Macedon Ranges',
        productTypes: ['wine', 'vegetables'],
        image: 'https://placehold.co/600x400/d2b4de/333333?text=Macedon+Vineyard',
        description: 'Experience cool-climate wine tasting in the Macedon Ranges.',
    },
    {
        id: 5,
        name: 'Phillip Island Farm Stay',
        location: 'Phillip Island',
        productTypes: ['eggs', 'vegetables', 'flowers', 'other'], // Example: Added 'other'
        image: 'https://placehold.co/600x400/f5b7b1/333333?text=Island+Farm+Stay',
        description: 'Relaxing farm stay experience near the coast.',
    },
    {
        id: 6,
        name: 'Bellarine Farm Experience',
        location: 'Bellarine Peninsula',
        productTypes: ['meat', 'vegetables', 'honey'],
        image: 'https://placehold.co/600x400/f0e68c/333333?text=Bellarine+Experience',
        description: 'Authentic farm life tours on the Bellarine Peninsula.',
    },
    {
        id: 7,
        name: 'Daylesford Harvest',
        location: 'Daylesford / Hepburn',
        productTypes: ['vegetables', 'honey', 'preserves', 'flowers'], // 'preserves' could be under 'honey' or 'other'
        image: 'https://placehold.co/600x400/b7e1cd/333333?text=Daylesford+Harvest',
        description: 'Seasonal produce from the spa country.',
    },
    {
        id: 8,
        name: 'Gippsland Grazing',
        location: 'Gippsland',
        productTypes: ['meat', 'dairy', 'eggs'],
        image: 'https://placehold.co/600x400/f3d9a2/333333?text=Gippsland+Grazing',
        description: 'Explore the vast farms of Gippsland.',
    },
];

// Keep categories export if still needed elsewhere, otherwise remove
// export const categories = [ /* ... */ ]; // Assuming categories are fully removed
