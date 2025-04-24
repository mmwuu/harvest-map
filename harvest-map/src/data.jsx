// File: src/data.jsx
import { Leaf, Apple, Milk, Grape, Home, Tractor } from 'lucide-react';

export const featuredFarms = [
    {
        id: 1,
        name: 'Green Valley Organics',
        location: 'Hunter Valley, NSW',
        type: 'Vegetables',
        image:
            'https://placehold.co/600x400/a2d9a1/333333?text=Green+Valley',
        description: 'Fresh, seasonal organic produce straight from the farm.',
    },
    {
        id: 2,
        name: 'Sunny Orchard Fruits',
        location: 'Orange, NSW',
        type: 'Fruits',
        image:
            'https://placehold.co/600x400/f8c471/333333?text=Sunny+Orchard',
        description: 'Pick your own apples, cherries, and berries.',
    },
    {
        id: 3,
        name: 'Coastal Dairy Delights',
        location: 'Bega Valley, NSW',
        type: 'Dairy',
        image:
            'https://placehold.co/600x400/aed6f1/333333?text=Coastal+Dairy',
        description: 'Award-winning cheeses and fresh milk.',
    },
    {
        id: 4,
        name: 'Rolling Hills Vineyard',
        location: 'Barossa Valley, SA',
        type: 'Vineyards',
        image:
            'https://placehold.co/600x400/d2b4de/333333?text=Rolling+Hills',
        description: 'Experience wine tasting amidst stunning vineyard landscapes.',
    },
    {
        id: 5,
        name: 'Mountain View Farm Stay',
        location: 'Blue Mountains, NSW',
        type: 'Farm Stays',
        image:
            'https://placehold.co/600x400/f5b7b1/333333?text=Mountain+View',
        description: 'Relaxing farm stay experience with animal feeding.',
    },
    {
        id: 6,
        name: 'Outback Station Experience',
        location: 'Flinders Ranges, SA',
        type: 'Experiences',
        image:
            'https://placehold.co/600x400/f0e68c/333333?text=Outback+Station',
        description: 'Authentic outback station life and tours.',
    },
];

export const categories = [
    { name: 'Vegetables', icon: Leaf },
    { name: 'Fruits',     icon: Apple },
    { name: 'Dairy',      icon: Milk },
    { name: 'Vineyards',  icon: Grape },
    { name: 'Farm Stays', icon: Home },
    { name: 'Experiences',icon: Tractor },
];
