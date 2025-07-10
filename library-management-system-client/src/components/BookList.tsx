import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    useGetAllBooksQuery,
    useDeleteBookMutation,
} from "../redux/apis/bookApi";
import { toast } from "react-toastify";
import type { IBook } from "../interfaces/book.interface";
import BorrowModal from "./BorrowModal";
import DeleteModal from "./DeleteModal";

export default function BookList() {
    const navigate = useNavigate();
    const { data: booksData, isLoading, error } = useGetAllBooksQuery();
    const [deleteBook] = useDeleteBookMutation();

    const books: IBook[] = booksData?.data || [];

    // --- FIX: Centralized state to manage which modal is active and for which book ---
    const [modalState, setModalState] = useState<{
        type: "borrow" | "delete" | null;
        book: IBook | null;
    }>({ type: null, book: null });

    // Safely handles navigation, ensuring a book ID exists.
    const handleRowClick = (bookId: string) => {
        if (bookId) {
            navigate(`/books/${bookId}`);
        }
    };

    const handleDelete = () => {
        if (!modalState.book?._id) return;

        toast.promise(deleteBook(modalState.book._id).unwrap(), {
            pending: "Deleting book...",
            success: "Book deleted successfully!",
            error: "Failed to delete book.",
        });
        // Close the modal after the action is initiated.
        setModalState({ type: null, book: null });
    };

    // --- FIX: Simplified functions to open modals by setting the correct state ---
    const openBorrowModal = (book: IBook) => {
        setModalState({ type: "borrow", book });
    };

    const openDeleteModal = (book: IBook) => {
        setModalState({ type: "delete", book });
    };

    // A single, reliable function to close any active modal.
    const closeModal = () => {
        setModalState({ type: null, book: null });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center bg-red-50 border border-red-200 rounded-xl p-8 max-w-md">
                    <h2 className="text-xl font-bold text-red-800 mb-2">
                        Error Loading Books
                    </h2>
                    <p className="text-red-600">
                        Please try refreshing the page.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
                <header>
                    <h1 className="text-3xl font-bold text-gray-800">
                        The World Library
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Explore our collection of {books.length} books.
                    </p>
                </header>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        Author
                                    </th>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        Genre
                                    </th>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        ISBN
                                    </th>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">
                                        Copies
                                    </th>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {books.map((book) => (
                                    <tr
                                        key={book.isbn}
                                        onClick={() =>
                                            handleRowClick(book._id!)
                                        }
                                        className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                            {book.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                            {book.author}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                            {book.genre}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                            {book.isbn}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-center">
                                            {book.copies}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span
                                                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                                    book.available
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {book.available
                                                    ? "Available"
                                                    : "Borrowed"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex justify-center items-center gap-2">
                                                <Link
                                                    to={`/edit-book/${book._id}`}
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                    className="px-3 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openBorrowModal(book);
                                                    }}
                                                    className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                                                >
                                                    Borrow
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openDeleteModal(book);
                                                    }}
                                                    className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* --- FIX: Modals are now correctly controlled by the single state object --- */}
            <BorrowModal
                book={modalState.book}
                isOpen={modalState.type === "borrow"}
                onClose={closeModal}
            />

            <DeleteModal
                isOpen={modalState.type === "delete"}
                bookTitle={modalState.book?.title || ""}
                onConfirm={handleDelete}
                onClose={closeModal}
            />
        </>
    );
}
