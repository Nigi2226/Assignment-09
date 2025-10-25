import { FaWater, FaSun, FaFlask, FaPooStorm } from 'react-icons/fa';

const careTips = [
    { icon: FaWater, title: "Watering Wisdom", description: "Always check the top inch of soil before watering. Avoid overwatering to prevent root rot." },
    { icon: FaSun, title: "Sunshine Needs", description: "Most indoor plants thrive in bright, indirect light. Rotate plants weekly for even growth." },
    { icon: FaFlask, title: "Fertilizing Facts", description: "Feed your plants monthly during spring and summer with a balanced, diluted liquid fertilizer." },
    { icon: FaPooStorm, title: "Pest Prevention", description: "Regularly inspect leaves for pests. A gentle wipe down with neem oil can keep them away." },
];

const CareTipsSection = () => {
    return (
        <section className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">Essential Plant Care Tips 💚</h2>
            <p className="text-gray-600 text-center mb-10">Simple steps for a thriving indoor garden.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {careTips.map((tip, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-6 bg-light-bg rounded-lg transition duration-300 hover:shadow-md">
                        <tip.icon className="text-5xl text-primary-green mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{tip.title}</h3>
                        <p className="text-gray-600 text-sm">{tip.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CareTipsSection;