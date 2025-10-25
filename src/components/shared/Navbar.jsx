import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import { FaUserCircle, FaLeaf } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logged out successfully.");
            })
            .catch(error => console.error(error));
    };

    const navLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-primary-green font-bold border-b-2 border-primary-green" : "hover:text-primary-green"}>Home</NavLink></li>
            <li><NavLink to="/plants" className={({ isActive }) => isActive ? "text-primary-green font-bold border-b-2 border-primary-green" : "hover:text-primary-green"}>Plants</NavLink></li>
            {user && <li><NavLink to="/profile" className={({ isActive }) => isActive ? "text-primary-green font-bold border-b-2 border-primary-green" : "hover:text-primary-green"}>My Profile</NavLink></li>}
        </>
    );

    return (
        <header className="shadow-md bg-white sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center text-2xl font-extrabold text-secondary-green gap-1">
                    <FaLeaf className="text-3xl text-primary-green" />
                    GreenNest
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex items-center gap-6">
                    <ul className="flex items-center gap-6 text-gray-700">
                        {navLinks}
                    </ul>
                </nav>

                {/* Auth/Profile Section */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img 
                                        alt="User Avatar" 
                                        src={user?.photoURL || 'https://i.postimg.cc/Nj4fB79M/default-avatar.png'} 
                                        title={user?.displayName}
                                    />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
                                <li className="font-semibold px-4 py-2 text-gray-800 border-b border-gray-100">{user?.displayName || "User"}</li>
                                <li><Link to="/profile" className="hover:bg-light-bg">Profile</Link></li>
                                <li><button onClick={handleLogout} className="hover:bg-red-50 text-red-500">Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login" className="px-4 py-2 border border-primary-green text-primary-green font-semibold rounded-full hover:bg-light-bg transition duration-200">
                                Login
                            </Link>
                            <Link to="/register" className="px-4 py-2 bg-primary-green text-white font-semibold rounded-full hover:bg-secondary-green transition duration-200 hidden md:inline-block">
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle (Simplified for brevity) */}
                <div className="lg:hidden">
                    {/* You would integrate a responsive drawer/hamburger menu here */}
                </div>
            </div>
        </header>
    );
};

export default Navbar;