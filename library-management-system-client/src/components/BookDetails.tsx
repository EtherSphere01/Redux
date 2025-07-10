import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    useGetBookByIdQuery,
    useDeleteBookMutation,
} from "../redux/apis/bookApi";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import BorrowModal from "./BorrowModal";
import type { IBook } from "../interfaces/book.interface";

export default function BookDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        data: bookData,
        isLoading,
        error,
        refetch,
    } = useGetBookByIdQuery(id!);
    const [deleteBook] = useDeleteBookMutation();
    const book = bookData?.data;

    // --- FIX: Centralized state management for modals ---
    const [modalState, setModalState] = useState<{
        type: "borrow" | "delete" | null;
    }>({ type: null });

    const handleDelete = () => {
        if (!book?._id) return;
        toast
            .promise(deleteBook(book._id).unwrap(), {
                pending: "Deleting book...",
                success: "Book deleted successfully!",
                error: "Failed to delete book.",
            })
            .then(() => {
                navigate("/");
            });
        // Close the modal after the action is initiated.
        setModalState({ type: null });
    };

    // A single function to close any active modal and refetch book data.
    const closeModal = () => {
        setModalState({ type: null });
        refetch(); // Refetch book data to show updated copy count, etc.
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center bg-red-50 border border-red-200 rounded-xl p-8 max-w-md">
                    <h2 className="text-xl font-bold text-red-800 mb-2">
                        Book Not Found
                    </h2>
                    <p className="text-gray-600 mb-4">
                        The book you're looking for doesn't exist or could not
                        be loaded.
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                    >
                        Back to Library
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-5xl mx-auto p-4 md:p-8">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {/* Book Cover Placeholder */}
                    <div className="md:col-span-1 flex justify-center items-start">
                        <img
                            src={`https://placehold.co/300x450/e2e8f0/334155?text=Book+Cover`}
                            alt={`${book.title} cover`}
                            className="rounded-lg shadow-lg w-full max-w-xs"
                        />
                    </div>

                    {/* Book Information */}
                    <div className="md:col-span-2 flex flex-col">
                        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-purple-100 text-purple-800 self-start">
                            {book.genre.replace("_", " ")}
                        </span>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-4">
                            {book.title}
                        </h1>
                        <p className="text-xl text-gray-500 mt-2">
                            by {book.author}
                        </p>

                        <div className="border-t border-gray-200 my-6"></div>

                        <div className="space-y-4 text-gray-700">
                            <p>
                                <span className="font-semibold text-gray-800">
                                    ISBN:
                                </span>{" "}
                                {book.isbn}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-800">
                                    Copies Available:
                                </span>{" "}
                                {book.copies}
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-800">
                                    Status:
                                </span>
                                <span
                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                        book.available
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {book.available
                                        ? "Available"
                                        : "Not Available"}
                                </span>
                            </div>
                        </div>

                        {/* --- FIX: Action Buttons now use the single state object --- */}
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                to={`/edit-book/${book._id}`}
                                className="px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors"
                            >
                                Edit Book
                            </Link>
                            <button
                                onClick={() =>
                                    setModalState({ type: "borrow" })
                                }
                                className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                            >
                                Borrow
                            </button>
                            <button
                                onClick={() =>
                                    setModalState({ type: "delete" })
                                }
                                className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate("/")}
                        className="text-purple-600 font-semibold hover:text-purple-800 transition-colors"
                    >
                        &larr; Back to Library
                    </button>
                </div>
            </div>

            {/* --- FIX: Modals are now correctly controlled by the single state object --- */}
            <BorrowModal
                book={book}
                isOpen={modalState.type === "borrow"}
                onClose={closeModal}
            />
            <DeleteModal
                isOpen={modalState.type === "delete"}
                bookTitle={book.title}
                onConfirm={handleDelete}
                onClose={closeModal}
            />
        </>
    );
}
