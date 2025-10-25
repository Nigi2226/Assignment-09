import { FaInstagram, FaFacebookF, FaPinterestP, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white mt-10">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
                    {/* Logo and About */}
                    <div>
                        <Link to="/" className="flex items-center text-3xl font-extrabold text-primary-green gap-1 mb-4">
                            <FaLeaf className="text-4xl" />
                            GreenNest
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Nurturing green homes for a healthier life, one plant at a time.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-primary-green">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/" className="hover:text-white transition">About Us (Fake)</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Contact Us (Fake)</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Privacy Policy (Fake)</Link></li>
                        </ul>
                    </div>

                    {/* Care & Services */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-primary-green">Our Services</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/plants" className="hover:text-white transition">Shop Plants</Link></li>
                            <li><Link to="/" className="hover:text-white transition">Care Guides</Link></li>
                            <li><Link to="/plant/p001" className="hover:text-white transition">Book Consultation</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-primary-green">Connect</h3>
                        <p className="text-gray-400 mb-4">Follow us on social media for daily dose of green inspiration.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300"><FaInstagram className="text-xl" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300"><FaFacebookF className="text-xl" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition duration-300"><FaPinterestP className="text-xl" /></a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center pt-8 text-gray-500 text-sm">
                    © 2025 GreenNest. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;