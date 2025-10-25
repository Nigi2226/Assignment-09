import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Leaf, LogIn, UserPlus, LogOut, CheckCircle, XCircle, Mail, Key, Google, User, Image, AlertTriangle, Home as HomeIcon } from 'lucide-react';

// --- FIREBASE SETUP ---
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInAnonymously, 
    signInWithCustomToken, 
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
} from 'firebase/auth';
import { getFirestore, setLogLevel } from 'firebase/firestore';

// Global variables MUST be used
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

let auth, db;
if (firebaseConfig) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    setLogLevel('error'); // Only log major errors
}
// --- END FIREBASE SETUP ---

// 1. Auth Context and Hook
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

// --- Toast Component for Error/Success Messages ---
const Toast = ({ message, type, onClose }) => {
    const icon = type === 'success' 
        ? <CheckCircle className="w-5 h-5 text-green-500" />
        : <XCircle className="w-5 h-5 text-red-500" />;
    
    const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
    const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';
    const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';

    if (!message) return null;

    return (
        <div 
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl border-l-4 ${bgColor} ${borderColor} flex items-center space-x-3 transition-opacity duration-300`}
            role="alert"
        >
            {icon}
            <div className={`flex-grow font-medium ${textColor}`}>
                {message}
            </div>
            <button onClick={onClose} className={`p-1 rounded-full hover:bg-opacity-75 ${textColor}`}>
                <XCircle className="w-4 h-4" />
            </button>
        </div>
    );
};
// --- End Toast Component ---


// 2. Auth Provider Component (Wrapper)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ message: '', type: '' });
    
    // State for simple internal routing (mimicking router functionality)
    const [currentPage, setCurrentPage] = useState('home');
    const [desiredRoute, setDesiredRoute] = useState('home'); // Stores intended page before login

    const showToast = useCallback((message, type = 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: '', type: '' }), 5000);
    }, []);

    useEffect(() => {
        if (!auth) {
             showToast('Firebase not configured.', 'error');
             setLoading(false);
             return;
        }

        const initializeAuth = async () => {
             // Handle custom token sign-in for Canvas environment
             if (initialAuthToken) {
                try {
                    await signInWithCustomToken(auth, initialAuthToken);
                } catch (e) {
                    await signInAnonymously(auth);
                }
            } else {
                await signInAnonymously(auth);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        initializeAuth();
        return () => unsubscribe();
    }, [showToast]);

    // Core Firebase Auth Functions
    const handleLogin = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            showToast('Login successful!', 'success');
            // Navigate to the desired route after success
            setCurrentPage(desiredRoute);
            setDesiredRoute('home');
            return true;
        } catch (error) {
            showToast(error.message, 'error');
            return false;
        }
    };

    const handleRegister = async (name, email, password, photoURL) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name,
                photoURL: photoURL || null 
            });

            showToast('Registration successful! You are now logged in.', 'success');
            setCurrentPage('home');
            return true;
        } catch (error) {
            showToast(error.message, 'error');
            return false;
        }
    };

    const handleGoogleSignIn = async (isRegisterFlow = false) => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            showToast(isRegisterFlow ? 'Registration successful with Google!' : 'Signed in with Google successfully!', 'success');
            setCurrentPage(desiredRoute === 'login' ? 'home' : desiredRoute);
            setDesiredRoute('home');
            return true;
        } catch (error) {
            showToast(error.message, 'error');
            return false;
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            showToast('Logged out successfully.', 'success');
            setCurrentPage('home');
        } catch (error) {
            showToast(error.message, 'error');
        }
    };
    
    const handleResetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            showToast('Password reset email sent! Check your inbox.', 'success');
            return true;
        } catch (error) {
            showToast(error.message, 'error');
            return false;
        }
    };

    const value = {
        user,
        loading,
        isLoggedIn: !!user && !user.isAnonymous,
        login: handleLogin,
        register: handleRegister,
        googleSignIn: handleGoogleSignIn,
        logout: handleLogout,
        resetPassword: handleResetPassword,
        showToast,
        currentPage,
        setCurrentPage,
        setDesiredRoute, // Allows components to set the return page
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
            <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
        </AuthContext.Provider>
    );
};

// --- Page Components (Now Internal) ---

// Helper component for navigation links
const NavLink = ({ page, children }) => {
    const { setCurrentPage } = useAuth();
    return (
        <button
            onClick={() => setCurrentPage(page)}
            className="px-4 py-2 text-white hover:text-lime-300 transition-colors duration-150 font-medium tracking-wide rounded-lg"
        >
            {children}
        </button>
    );
};

// 3. Header Component
const Header = () => {
    const { isLoggedIn, logout, user } = useAuth();
    
    const displayName = user?.displayName || user?.email?.split('@')[0] || 'Guest';

    return (
        <header className="bg-gradient-to-r from-green-900 to-green-800 shadow-xl sticky top-0 z-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo and App Name */}
                <button 
                    onClick={() => useAuth().setCurrentPage('home')} 
                    className="flex items-center space-x-2 text-white transition-transform duration-300 hover:scale-[1.02]"
                >
                    <Leaf className="w-6 h-6 text-lime-400" />
                    <span className="text-xl font-extrabold tracking-wider">
                        GreenThumb
                    </span>
                </button>

                {/* Navigation Links */}
                <nav className="flex space-x-2 sm:space-x-4">
                    <NavLink page="home"><HomeIcon className="w-5 h-5 inline mr-1" />Home</NavLink>
                    {isLoggedIn && <NavLink page="plants">My Plants</NavLink>}
                </nav>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-3">
                    {isLoggedIn ? (
                        <>
                            <span className="text-white text-sm hidden sm:inline-block">
                                Hello, {displayName}
                            </span>
                            <button 
                                onClick={logout} 
                                className="flex items-center space-x-2 btn-secondary"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink page="login">
                                <LogIn className="w-5 h-5 inline mr-1" />
                                Login
                            </NavLink>
                            <button 
                                onClick={() => useAuth().setCurrentPage('register')} 
                                className="flex items-center space-x-2 btn-primary"
                            >
                                <UserPlus className="w-5 h-5" />
                                <span className="hidden sm:inline">Register</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

// 4. Home Page
const Home = () => {
    const { isLoggedIn, user, setCurrentPage } = useAuth();
    const displayName = user?.displayName || user?.email?.split('@')[0] || 'Plant Enthusiast';

    return (
        <div className="max-w-4xl mx-auto py-16 px-4 text-center">
            <h1 className="text-5xl font-extrabold text-green-800 mb-4">
                Welcome to GreenThumb!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
                Your personal digital companion for all your green companions.
            </p>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100">
                {isLoggedIn ? (
                    <>
                        <p className="text-2xl font-semibold text-green-600 mb-6">
                            Hi, {displayName}! Your account is active.
                        </p>
                        <button onClick={() => setCurrentPage('plants')} className="btn-primary text-lg px-8 py-3">
                            Go to My Plants
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-xl text-gray-700 mb-6">
                            To start tracking your plants' care schedules and progress, please log in or register.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button onClick={() => setCurrentPage('login')} className="btn-secondary text-lg px-8 py-3">
                                Login Now
                            </button>
                            <button onClick={() => setCurrentPage('register')} className="btn-primary text-lg px-8 py-3">
                                Register for Free
                            </button>
                        </div>
                    </>
                )}
            </div>
            
            <div className="mt-12">
                <p className="text-gray-500">
                    *This application uses Firebase for secure, real-time user authentication and data management.
                </p>
            </div>
        </div>
    );
};

// 5. Login Page
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, googleSignIn, showToast, setCurrentPage, resetPassword } = useAuth(); 

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            showToast('Please fill in both email and password.', 'error');
            return;
        }
        await login(email, password);
    };

    const handleGoogleLogin = async () => {
        await googleSignIn(false);
    };
    
    const handleForgotPassword = async () => {
        if (!email) {
            showToast('Please enter your email address in the field above to reset your password.', 'error');
            return;
        }
        await resetPassword(email);
    }

    return (
        <div className="flex justify-center items-center py-16 px-4">
            <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-green-200/50">
                <div className="text-center mb-8">
                    <div className="inline-block p-3 bg-green-700 rounded-full shadow-lg mb-4">
                        <Key className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-green-900">Sign In</h2>
                    <p className="text-gray-500 mt-2">Manage your collection.</p>
                </div>

                <button 
                    onClick={handleGoogleLogin} 
                    className="w-full flex items-center justify-center space-x-3 py-3 border border-gray-300 text-gray-700 bg-gray-50 rounded-xl font-semibold hover:bg-gray-100 transition duration-150 shadow-md mb-6"
                >
                    <Google className="w-5 h-5" />
                    <span>Sign in with Google</span>
                </button>

                <div className="relative flex items-center justify-center my-6">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200"></div>
                    <span className="relative z-10 px-3 bg-white text-gray-500 text-sm">or use email</span>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input-field pl-10" required />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="input-field pl-10" required />
                        </div>
                        
                        <div className="text-right mt-2">
                            <button type="button" onClick={handleForgotPassword} className="text-sm text-green-600 hover:text-green-800 transition duration-150">
                                Forgot Password?
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="w-full btn-primary mt-6">Log In</button>
                </form>

                <p className="text-center text-sm mt-6 text-gray-600">
                    Don't have an account? 
                    <button onClick={() => setCurrentPage('register')} className="text-green-600 font-semibold hover:text-green-800 ml-1 transition duration-150">
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

// 6. Register Page
const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) { errors.push("Length must be at least 6 characters."); }
    if (!/[A-Z]/.test(password)) { errors.push("Must have an Uppercase letter."); }
    if (!/[a-z]/.test(password)) { errors.push("Must have a Lowercase letter."); }
    return errors;
};

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    
    const { register, googleSignIn, showToast, setCurrentPage } = useAuth(); 

    React.useEffect(() => {
        if (password) { setPasswordErrors(validatePassword(password)); } else { setPasswordErrors([]); }
    }, [password]);

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (passwordErrors.length > 0) {
            showToast('Please fix password validation errors before registering.', 'error');
            return;
        }
        if (!name || !email || !password) {
            showToast('Name, email, and password are required.', 'error');
            return;
        }
        await register(name, email, password, photoURL);
    };

    const handleGoogleRegister = async () => {
        await googleSignIn(true);
    };

    return (
        <div className="flex justify-center items-center py-16 px-4">
            <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-green-200/50">
                <div className="text-center mb-8">
                    <div className="inline-block p-3 bg-green-700 rounded-full shadow-lg mb-4">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-green-900">Create Account</h2>
                    <p className="text-gray-500 mt-2">Start your plant journey with us.</p>
                </div>

                <button 
                    onClick={handleGoogleRegister} 
                    className="w-full flex items-center justify-center space-x-3 py-3 border border-gray-300 text-gray-700 bg-gray-50 rounded-xl font-semibold hover:bg-gray-100 transition duration-150 shadow-md mb-6"
                >
                    <Google className="w-5 h-5" />
                    <span>Sign up with Google</span>
                </button>

                <div className="relative flex items-center justify-center my-6">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200"></div>
                    <span className="relative z-10 px-3 bg-white text-gray-500 text-sm">or register with email</span>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="input-field pl-10" required />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input-field pl-10" required />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className={`input-field pl-10 ${passwordErrors.length > 0 ? 'border-red-500' : ''}`}
                                required
                            />
                        </div>
                        {password && (
                            <ul className="mt-2 text-sm space-y-1">
                                {passwordErrors.map((error, index) => (
                                    <li key={index} className="flex items-center text-red-600">
                                        <AlertTriangle className="w-3 h-3 mr-1 flex-shrink-0" />
                                        {error}
                                    </li>
                                ))}
                                {passwordErrors.length === 0 && (<li className="text-green-600">Password looks strong!</li>)}
                            </ul>
                        )}
                    </div>
                    
                    <div>
                        <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 mb-2">Photo URL (Optional)</label>
                        <div className="relative">
                            <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input id="photoURL" type="url" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} placeholder="e.g., https://link/to/photo.jpg" className="input-field pl-10" />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full btn-primary mt-6 disabled:bg-green-300 disabled:cursor-not-allowed"
                        disabled={passwordErrors.length > 0}
                    >
                        Register Account
                    </button>
                </form>

                <p className="text-center text-sm mt-6 text-gray-600">
                    Already have an account? 
                    <button onClick={() => setCurrentPage('login')} className="text-green-600 font-semibold hover:text-green-800 ml-1 transition duration-150">
                        Log In
                    </button>
                </p>
            </div>
        </div>
    );
};

// 7. Protected Plants Page (Placeholder)
const Plants = () => {
    const { user } = useAuth();
    const displayName = user?.displayName || 'User';

    return (
        <div className="max-w-4xl mx-auto py-16 px-4 text-center">
            <h1 className="text-4xl font-bold text-green-700 mb-4">
                {displayName}'s Plant Collection
            </h1>
            <p className="text-xl text-gray-600 mb-8">
                
            </p>
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100">
                <p className="text-lg text-gray-700">
                    This is your personal, protected area. In a future iteration, we will implement Firestore to let you add, update, and track your plants!
                </p>
                <div className="mt-6 p-4 bg-lime-50 rounded-lg text-left">
                    <h3 className="font-semibold text-lime-700">User Details:</h3>
                    <p><strong>UID:</strong> <span className="break-all">{user.uid}</span></p>
                    <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

// 8. Main Application Router (Simple State-Based)
const AppRouter = () => {
    const { currentPage, isLoggedIn, setCurrentPage, setDesiredRoute } = useAuth();
    
    // Protected Route Logic
    useEffect(() => {
        if (currentPage === 'plants' && !isLoggedIn) {
            // Save the intended route and redirect to login
            setDesiredRoute('plants');
            setCurrentPage('login');
            useAuth().showToast('You must be logged in to view your plants.', 'error');
        }
    }, [currentPage, isLoggedIn, setCurrentPage, setDesiredRoute]);


    let ContentComponent;
    switch (currentPage) {
        case 'login':
            ContentComponent = Login;
            break;
        case 'register':
            ContentComponent = Register;
            break;
        case 'plants':
            // Check auth again for safety, though handled by useEffect above
            ContentComponent = isLoggedIn ? Plants : Login; 
            break;
        case 'home':
        default:
            ContentComponent = Home;
            break;
    }

    return <ContentComponent />;
};


// 9. Footer Component
const Footer = () => (
    <footer className="bg-green-900/95 text-white/80 py-4 mt-auto">
        <div className="max-w-7xl mx-auto text-center text-sm px-4">
            &copy; {new Date().getFullYear()} GreenThumb. All rights reserved. | 
            <span className="ml-2 text-lime-400">Your Plant Companion</span>
        </div>
    </footer>
);


// 10. Main Default Export Component
export default function App() {
    return (
        // FIX: Removed the extraneous <script> tag which caused the "Expected ) but found className" error, 
        // as React components must return a single root element (or a Fragment).
        <div className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-green-50 to-white/90">
            <style>{`
                .font-sans { font-family: 'Inter', sans-serif; }
                .input-field {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border: 1px solid #d1d5db;
                    border-radius: 0.75rem; /* rounded-xl */
                    transition: all 0.2s;
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                }
                .input-field:focus {
                    border-color: #10b981; /* green-500 */
                    outline: none;
                    ring: 2px;
                    ring-color: #10b981;
                }
                .btn-primary {
                    background-color: #059669; /* emerald-600 */
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    transition: background-color 0.2s, transform 0.1s;
                }
                .btn-primary:hover {
                    background-color: #047857; /* emerald-700 */
                    transform: translateY(-1px);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .btn-secondary {
                    background-color: transparent;
                    color: #fff;
                    border: 2px solid #a7f3d0; /* lime-300 */
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                .btn-secondary:hover {
                    background-color: #a7f3d020; /* light hover effect */
                    color: #fff;
                    border-color: #d9f99d; /* lime-200 */
                }
            `}</style>
            <AuthProvider>
                <Header />
                <main className="flex-grow"> 
                    <AppRouter />
                </main>
                <Footer />
            </AuthProvider>
        </div>
    );
};
