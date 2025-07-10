import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const tabs = [
        { name: "All Books", path: "/" },
        { name: "Add Book", path: "/create-book" },
        { name: "Borrow Summary", path: "/borrow-summary" },
    ];
    const baseLinkClass =
        "px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200";
    const activeLinkClass = "bg-purple-100 text-purple-700";
    const inactiveLinkClass =
        "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

    return (
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <NavLink to="/" className="flex items-center gap-3">
                        <svg
                            className="h-8 w-8 text-purple-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6.253v11.494m-5.714-4.24a5.714 5.714 0 1111.428 0M4.286 17.747a5.714 5.714 0 0111.428 0"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 19h16"
                            />
                        </svg>
                        <span className="text-xl font-bold text-gray-800">
                            World Library
                        </span>
                    </NavLink>
                    <nav className="hidden md:flex items-center gap-2">
                        {tabs.map((tab) => (
                            <NavLink
                                key={tab.name}
                                to={tab.path}
                                className={({ isActive }) =>
                                    `${baseLinkClass} ${
                                        isActive
                                            ? activeLinkClass
                                            : inactiveLinkClass
                                    }`
                                }
                            >
                                {tab.name}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                        isMenuOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <nav className="flex flex-col gap-2">
                            {tabs.map((tab) => (
                                <NavLink
                                    key={tab.name}
                                    to={tab.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block text-center ${baseLinkClass} ${
                                            isActive
                                                ? activeLinkClass
                                                : inactiveLinkClass
                                        }`
                                    }
                                >
                                    {tab.name}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
