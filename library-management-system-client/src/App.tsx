import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* --- Header --- */}
            <Header />

            {/* --- Main Content --- */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* --- Footer --- */}
            <Footer />

            {/* --- Toast Notifications --- */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}
