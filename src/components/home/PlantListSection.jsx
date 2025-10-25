// src/components/home/PlantListSection.jsx
import { useEffect, useState } from "react";
import PlantCard from "./PlantCard";
import { Link } from "react-router-dom";

// 🚨 FIX: Path must be two levels up (../../) to reach src/data/plants.json
import plantsData from "../../data/plants.json"; 

const PlantListSection = () => {
    const [topPlants, setTopPlants] = useState([]);

    useEffect(() => {
        // Sort by rating and limit to 4
        const sorted = [...plantsData].sort((a, b) => b.rating - a.rating).slice(0, 4);
        setTopPlants(sorted);
    }, []);

    return (
        <section className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Rated Indoor Plants 🌱</h2>
            <p className="text-gray-600 mb-10">Shop our user favorites for a guaranteed beautiful addition to your home.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {topPlants.map(plant => (
                    <PlantCard key={plant.plantId} plant={plant} />
                ))}
            </div>
            
            <Link to="/plants" className="mt-10 inline-block px-8 py-3 bg-primary-green text-black font-semibold rounded-full hover:bg-secondary-green transition duration-300">
                View All Plants
            </Link>
        </section>
    );
};

export default PlantListSection;