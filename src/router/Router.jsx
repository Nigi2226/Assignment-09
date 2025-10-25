// src/router/Router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PlantDetails from "../pages/PlantDetails";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/routes/ProtectedRoute";
import Plants from "../pages/Plants";
// Import the static data directly from src/data/plants.json
import plantsData from "../data/plants.json"; 

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/plants", element: <Plants /> },
            {
                // Protected Route for Details
                path: "/plant/:plantId",
                element: <ProtectedRoute><PlantDetails /></ProtectedRoute>,
                // Correctly uses the imported data for the loader
                loader: ({ params }) => {
                    return plantsData.find(p => p.plantId === params.plantId);
                }
            },
            {
                // Protected Route for Profile
                path: "/profile",
                element: <ProtectedRoute><Profile /></ProtectedRoute>,
            },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            // Optional 404 route for paths not matched
            { path: "*", element: <div className="text-center py-20 text-red-500 text-3xl">404 | Page Not Found</div> }
        ],
    },
]);

export default router;