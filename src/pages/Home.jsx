import HeroSlider from '../components/home/HeroSlider';
import PlantListSection from '../components/home/PlantListSection'; // Using a placeholder name
import CareTipsSection from '../components/home/CareTipsSection';
import ExpertsSection from '../components/home/ExpertsSection';
import ExtraSection from '../components/home/ExtraSection'; // For "Plant of the Week"

const Home = () => {
    return (
        <div className="bg-light-bg">
            <HeroSlider />
            <div className="container mx-auto px-4 space-y-20 py-10">
                <PlantListSection />
                <ExtraSection /> {/* Plant of the Week */}
                <CareTipsSection />
                <ExpertsSection />
            </div>
        </div>
    );
};

export default Home;