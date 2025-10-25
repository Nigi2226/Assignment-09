import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import SocialLogin from "../components/auth/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const { signIn, resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    // Redirect path: either the state passed from ProtectedRoute, or the homepage
    const from = location.state || "/"; 
    
    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailInput, setEmailInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginError("");
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                toast.success("Login successful! Welcome back 🌱");
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error);
                setLoginError(error.message.replace("Firebase: Error (auth/", "").replace(").", ""));
            });
    };

    // Forgot Password Implementation
    const handleForgetPassword = () => {
        if (!emailInput) {
            return toast.error("Please enter your email in the email field first to reset password.");
        }
        resetPassword(emailInput)
            .then(() => {
                toast.success("Password reset email sent! Check your inbox (and spam).");
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message);
            });
    };

    return (
        <div className="min-h-[calc(100vh-150px)] flex items-center justify-center p-4 bg-light-bg">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-primary-green">Login to GreenNest</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="you@example.com" 
                            required 
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-green focus:border-primary-green" 
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
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

                    <div className="text-right">
                        <button 
                            type="button"
                            onClick={handleForgetPassword}
                            className="text-sm font-medium text-primary-green hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {loginError && (
                        <p className="text-sm text-red-500">{loginError}</p>
                    )}

                    <button type="submit" className="w-full py-2 px-4 bg-primary-green text-white font-semibold rounded-md hover:bg-secondary-green transition duration-300">
                        Login
                    </button>
                </form>

                <div className="flex items-center space-x-2">
                    <hr className="flex-grow border-gray-300" />
                    <span className="text-sm text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <SocialLogin from={from} />

                <p className="text-sm text-center text-gray-600">
                    Don't have an account? <Link to="/register" className="font-semibold text-primary-green hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
