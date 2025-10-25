// src/pages/Plants.jsx
import PlantCard from "../components/home/PlantCard";

// 🚨 FIX: Path must be one level up (../) to reach src/data/plants.json
import plantsData from "../data/plants.json"; 

const Plants = () => {
    return (
        <div className="container mx-auto px-4 py-12 bg-light-bg">
            <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">Our Full Collection</h1>
            <p className="text-center text-gray-600 mb-12">Discover the perfect companion for every corner of your home.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {plantsData.map(plant => (
                    <PlantCard key={plant.plantId} plant={plant} />
                ))}
            </div>
        </div>
    );
};

export default Plants;