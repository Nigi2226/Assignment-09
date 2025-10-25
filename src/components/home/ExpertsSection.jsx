import ExpertCard from "./ExpertCard";

const expertsData = [
    {
        name: "Dr. Willow Pothos",
        specialization: "Aroid & Tropical Care",
        image: "https://i.postimg.cc/BvpF0fX7/expert1.jpg",
        rating: 5.0
    },
    {
        name: "Jasmine Fern",
        specialization: "Pest & Disease Control",
        image: "https://i.postimg.cc/85zK0X8p/expert2.jpg",
        rating: 4.8
    },
    {
        name: "Moss Chadwick",
        specialization: "Low Light Specialists",
        image: "https://i.postimg.cc/8P22gqK3/expert3.jpg",
        rating: 4.9
    },
    {
        name: "Flora Verde",
        specialization: "Eco Interior Design",
        image: "https://i.postimg.cc/Nj4fB79M/expert4.jpg",
        rating: 4.7
    },
];

const ExpertsSection = () => {
    return (
        <section className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Green Experts 🧑‍🔬</h2>
            <p className="text-gray-600 mb-10">Schedule a one-on-one session for personalized plant diagnostics.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {expertsData.map((expert, index) => (
                    <ExpertCard key={index} expert={expert} />
                ))}
            </div>
        </section>
    );
};

export default ExpertsSection;