import React from "react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between md:flex-row">
                    <div className="flex items-center gap-3">
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
                        <span className="text-lg font-bold text-gray-800">
                            World Library
                        </span>
                    </div>
                    <p className="mt-4 text-center text-sm text-gray-500 md:mt-0">
                        &copy; {new Date().getFullYear()} World Library. All
                        Rights Reserved. <br />
                        Dhaka, Bangladesh.
                    </p>
                </div>
            </div>
        </footer>
    );
}
