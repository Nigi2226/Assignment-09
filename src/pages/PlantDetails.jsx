import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaStar, FaLeaf, FaCoins, FaShoppingCart } from 'react-icons/fa';
import toast from 'react-hot-toast';

const PlantDetails = () => {
    const plant = useLoaderData(); 
    const [bookingData, setBookingData] = useState({ name: '', email: '' });

    if (!plant) {
        return <div className="text-center py-20 text-red-500">Plant not found!</div>;
    }

    const {
        plantName, category, price, rating, availableStock, careLevel, 
        description, image, providerName, plantId
    } = plant;

    const handleFormChange = (e) => {
        setBookingData({
            ...bookingData,
            [e.target.name]: e.target.value,
        });
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        
        if (!bookingData.name || !bookingData.email) {
            return toast.error("Please fill in both name and email for the consultation.");
        }

        console.log("Booking initiated for:", plantName, bookingData);
        
        toast.success(`Consultation booked successfully for ${plantName}! An expert will contact you at ${bookingData.email}.`);

        // Clear Form
        setBookingData({ name: '', email: '' });
        e.target.reset();
    };

    return (
        <div className="container mx-auto px-4 py-10 bg-white shadow-lg rounded-xl my-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* Image and Meta */}
                <div className="lg:col-span-2">
                    <img 
                        src={image} 
                        alt={plantName} 
                        className="w-full h-auto max-h-[550px] object-cover rounded-xl shadow-lg mb-6"
                    />

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{plantName}</h1>
                        <p className="text-xl text-gray-600">{description}</p>
                        
                        {/* Key Metrics */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <span className="flex items-center gap-2 px-4 py-2 bg-primary-green text-white font-semibold rounded-full">
                                <FaLeaf /> {category}
                            </span>
                            <span className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 font-semibold rounded-full">
                                <FaStar /> {rating} Rating
                            </span>
                            <span className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-full">
                                Care Level: {careLevel}
                            </span>
                        </div>

                        {/* Price and Stock */}
                        <div className="flex items-center gap-6 border-t border-gray-200 pt-4 mt-4">
                            <p className="text-4xl font-bold text-secondary-green flex items-center gap-2">
                                <FaCoins /> ${price}
                            </p>
                            <p className={`text-lg font-semibold ${availableStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                Stock: {availableStock > 0 ? `${availableStock} available` : 'Sold Out'}
                            </p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Provided by: {providerName}</p>
                    </div>
                </div>

                {/* Consultation Form */}
                <div className="lg:col-span-1 bg-light-bg p-8 rounded-xl shadow-inner h-fit">
                    <h2 className="text-3xl font-bold text-primary-green mb-4">Book Expert Consultation</h2>
                    <p className="text-gray-600 mb-6">Need help with your {plantName}? Book a session with one of our green experts.</p>

                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                            <input 
                                type="text" 
                                id="name"
                                name="name" 
                                value={bookingData.name}
                                onChange={handleFormChange}
                                placeholder="Full Name"
                                required 
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-green focus:border-primary-green" 
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                            <input 
                                type="email" 
                                id="email"
                                name="email" 
                                value={bookingData.email}
                                onChange={handleFormChange}
                                placeholder="you@example.com"
                                required 
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-green focus:border-primary-green" 
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full py-3 px-4 bg-secondary-green text-white font-semibold rounded-lg hover:bg-primary-green transition duration-300 flex items-center justify-center gap-2"
                        >
                            <FaShoppingCart /> Book Now (${price} Service Fee)
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PlantDetails;