import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SocialLogin = ({ from = "/" }) => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                toast.success("Google Sign-In successful! 🌱");
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error);
                toast.error("Google Sign-In Failed.");
            });
    };

    return (
        <div className="space-y-3">
            <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300"
            >
                <FcGoogle className="text-xl" />
                Continue with Google
            </button>
        </div>
    );
};

export default SocialLogin;