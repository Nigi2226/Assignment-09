import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
    sendPasswordResetEmail
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // 1. CREATE USER (Register)
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // 2. SIGN IN (Login)
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // 3. GOOGLE SIGN IN
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // 4. LOGOUT
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // 5. UPDATE PROFILE (Challenge)
    const userUpdateProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    };

    // 6. FORGOT PASSWORD (Challenge)
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // Observe User State (Component Mount)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log("Current user in context:", currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe(); // Cleanup function
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        userUpdateProfile,
        resetPassword,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;