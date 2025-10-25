import React from 'react';

const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-full min-h-[50vh] flex-col">
            {/* Simple Tailwind/CSS Spinner */}
            <div className="w-12 h-12 border-4 border-t-4 border-t-primary-green border-gray-200 rounded-full animate-spin"></div>
            <p className="mt-4 text-primary-green font-medium">Loading GreenNest...</p>
        </div>
    );
};

export default Spinner;


