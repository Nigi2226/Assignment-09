import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const PlantCard = ({ plant }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col h-full">
            <div className="relative overflow-hidden rounded-lg mb-4 h-48">
                <img 
                    src={plant.image} 
                    alt={plant.plantName} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-2 left-2 bg-primary-green text-white text-xs font-bold px-3 py-1 rounded-full">{plant.careLevel} Care</span>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 flex-grow">{plant.plantName}</h3>
            
            <div className="flex justify-between items-center my-2">
                <p className="text-2xl font-bold text-secondary-green">${plant.price}</p>
                <div className="flex items-center text-yellow-500">
                    <FaStar className="mr-1" />
                    <span className="text-gray-600">{plant.rating}</span>
                </div>
            </div>
            
            <Link to={`/plant/${plant.plantId}`} className="mt-3 w-full block text-center py-2 px-4 border border-primary-green text-primary-green font-semibold rounded-full hover:bg-light-bg transition duration-300">
                View Details
            </Link>
        </div>
    );
};

export default PlantCard;