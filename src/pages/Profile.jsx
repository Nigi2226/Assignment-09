import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

const Profile = () => {
    const { user, userUpdateProfile, logOut } = useContext(AuthContext);
    const [name, setName] = useState(user?.displayName || '');
    const [photo, setPhoto] = useState(user?.photoURL || '');
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setIsUpdating(true);

        userUpdateProfile(name, photo)
            .then(() => {
                toast.success("Profile updated successfully! 🌱");
            })
            .catch(error => {
                console.error(error);
                toast.error("Failed to update profile.");
            })
            .finally(() => {
                setIsUpdating(false);
            });
    };

    return (
        <div className="min-h-[calc(100vh-150px)] flex flex-col items-center p-8 bg-light-bg">
            <h2 className="text-4xl font-bold text-primary-green mb-8">My Profile</h2>
            
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 md:p-10">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                    {/* User Avatar */}
                    <img 
                        src={user?.photoURL || 'https://i.postimg.cc/Nj4fB79M/default-avatar.png'} 
                        alt="User Avatar" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-primary-green shadow-lg" 
                    />
                    
                    {/* User Details */}
                    <div className="text-center md:text-left">
                        <p className="text-3xl font-bold text-gray-800">{user?.displayName || "User Name Not Set"}</p>
                        <p className="text-lg text-gray-500">{user?.email}</p>
                        <p className={`mt-2 px-3 py-1 text-sm font-semibold rounded-full ${user?.emailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {user?.emailVerified ? 'Email Verified' : 'Email Not Verified'}
                        </p>
                    </div>
                </div>

                <hr className="my-6" />

                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Update Profile Details</h3>
                
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Display Name</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            required 
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-green focus:border-primary-green" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Photo URL</label>
                        <input 
                            type="url" 
                            value={photo} 
                            onChange={(e) => setPhoto(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-green focus:border-primary-green" 
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isUpdating}
                        className="w-full py-2 px-4 bg-primary-green text-white font-semibold rounded-md hover:bg-secondary-green transition duration-300 disabled:bg-gray-400"
                    >
                        {isUpdating ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>

                <button 
                    onClick={logOut}
                    className="w-full mt-4 py-2 px-4 border border-red-500 text-red-500 font-semibold rounded-md hover:bg-red-50 transition duration-300"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Profile;