import { FaSeedling, FaTag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const plantOfTheWeek = {
    name: "Calathea Orbifolia",
    description: "Known for its large, rounded, striped leaves, the Orbifolia is a stunning addition. It requires high humidity and bright, indirect light.",
    image: "https://i.postimg.cc/Njf3B1g3/calathea-orbifolia.jpg",
    link: "/plant/p002", // Linking to Monstera for demo
    price: 35
};

const ExtraSection = () => {
    return (
        <section className="bg-primary-green text-white p-10 rounded-2xl shadow-2xl flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/3">
                <img 
                    src={plantOfTheWeek.image} 
                    alt={plantOfTheWeek.name} 
                    className="w-full h-auto rounded-xl shadow-lg object-cover transform hover:scale-105 transition duration-500"
                />
            </div>
            <div className="lg:w-2/3 space-y-4 text-center lg:text-left">
                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center justify-center lg:justify-start gap-2">
                    <FaSeedling className='text-yellow-300' /> PLANT OF THE WEEK
                </h3>
                <h2 className="text-5xl font-extrabold">{plantOfTheWeek.name}</h2>
                <p className="text-xl font-light opacity-90">{plantOfTheWeek.description}</p>
                <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
                    <p className="text-3xl font-bold flex items-center gap-2">
                        <FaTag className='text-yellow-300' /> ${plantOfTheWeek.price}
                    </p>
                    <Link 
                        to={plantOfTheWeek.link} 
                        className="px-6 py-3 bg-emerald-800 text-secondary-green font-bold rounded-full hover:bg-emerald-600 transition duration-300 shadow-md"
                    >
                        View & Shop Now
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ExtraSection;