import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import SocialLogin from "../components/auth/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const { createUser, userUpdateProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPasswordError("");
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photo.value;
        const password = form.password.value;

        // Password Validation Logic
        if (password.length < 6) {
            return setPasswordError("Password must be at least 6 characters.");
        }
        if (!/[A-Z]/.test(password)) {
            return setPasswordError("Password must contain at least one uppercase letter.");
        }
        if (!/[a-z]/.test(password)) {
            return setPasswordError("Password must contain at least one lowercase letter.");
        }
        
        // 1. Create User
        createUser(email, password)
            .then(result => {
                // 2. Update Profile
                userUpdateProfile(name, photoURL)
                    .then(() => {
                        toast.success("Registration successful! Welcome to GreenNest 🌱");
                        navigate("/");
                    })
                    .catch(error => {
                        console.error(error);
                        toast.error("Profile update failed after registration.");
                    });
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message.replace("Firebase: Error (auth/", "").replace(").", ""));
            });
    };

    return (
        <div className="min-h-[calc(100vh-150px)] flex items-center justify-center p-4 bg-light-bg">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-primary-green">Register for GreenNest</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" name="name" placeholder="John Doe" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-green focus:border-primary-green" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" name="email" placeholder="you@example.com" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-green focus:border-primary-green" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Photo URL (Optional)</label>
                        <input type="url" name="photo" placeholder="https://i.postimg.cc/your-avatar.png" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-green focus:border-primary-green" />
                    </div>
                    <div className="relative">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            placeholder="******" 
                            required 
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-green focus:border-primary-green" 
                        />
                        <span 
                            className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* Password Error Display */}
                    {passwordError && (
                        <p className="text-sm text-red-500 mt-2">{passwordError}</p>
                    )}

                    <button type="submit" className="w-full py-2 px-4 bg-primary-green text-white font-semibold rounded-md hover:bg-secondary-green transition duration-300">
                        Register
                    </button>
                </form>

                <div className="flex items-center space-x-2">
                    <hr className="flex-grow border-gray-300" />
                    <span className="text-sm text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <SocialLogin />

                <p className="text-sm text-center text-gray-600">
                    Already have an account? <Link to="/login" className="font-semibold text-primary-green hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;