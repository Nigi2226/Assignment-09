import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

const slides = [
    {
        title: "Nurture Your Green Side",
        slogan: "Indoor plants for a healthier, happier home.",
        image: "https://i.postimg.cc/Nj0Fp02c/slide1-hero.jpg",
        link: "/plants"
    },
    {
        title: "Expert Care, Always",
        slogan: "Book a consultation and keep your plants thriving.",
        image: "https://i.postimg.cc/q73760W2/slide2-hero.jpg",
        link: "/profile" // Link to a service/details page
    },
    {
        title: "Decorate with Nature",
        slogan: "Find the perfect eco-friendly decor ideas.",
        image: "https://i.postimg.cc/CLGq9y0y/slide3-hero.jpg",
        link: "/plants"
    },
];

const HeroSlider = () => {
    return (
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden shadow-xl">
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="mySwiper w-full h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div 
                            className="h-full w-full bg-cover bg-center flex items-center justify-start p-10 md:p-20"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-30"></div> 
                            
                            <div className="relative z-10 max-w-lg text-black">
                                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                                    {slide.title}
                                </h1>
                                <p className="text-xl md:text-2xl mb-8 font-light drop-shadow">
                                    {slide.slogan}
                                </p>
                                <Link 
                                    to={slide.link}
                                    className="inline-block px-8 py-3 bg-primary-green text-black font-semibold rounded-full text-lg hover:bg-secondary-green transition duration-300 shadow-lg"
                                >
                                    Explore Now
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSlider;