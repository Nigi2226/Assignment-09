import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
    return (
        <div className="bg-white font-sans">
            <Navbar />
            
            <main className="min-h-[calc(100vh-250px)]"> 
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};

export default MainLayout;