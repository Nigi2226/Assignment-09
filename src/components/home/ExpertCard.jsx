import { FaStar, FaEnvelope } from "react-icons/fa";

const ExpertCard = ({ expert }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center flex flex-col items-center">
            <img 
                src={expert.image} 
                alt={expert.name} 
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary-green shadow-md"
            />
            <h3 className="text-2xl font-bold text-gray-800">{expert.name}</h3>
            <p className="text-primary-green font-medium mb-3">{expert.specialization}</p>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <FaStar className="text-yellow-500" />
                <span>{expert.rating} Rated</span>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary-green text-white text-sm rounded-full hover:bg-primary-green transition duration-300">
                <FaEnvelope /> Contact
            </button>
        </div>
    );
};

export default ExpertCard;