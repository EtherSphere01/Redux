import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    useGetBookByIdQuery,
    useUpdateBookMutation,
} from "../redux/apis/bookApi";
import { toast } from "react-toastify";
import type { IBook } from "../interfaces/book.interface";

export default function EditBook() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        data: bookData,
        isLoading: isFetching,
        error,
    } = useGetBookByIdQuery(id!);
    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
    const [formData, setFormData] = useState<Partial<IBook> | null>(null);

    const genres = [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
    ];

    useEffect(() => {
        if (bookData?.data) {
            setFormData(bookData.data);
        }
    }, [bookData]);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value, type } = e.target;
        const processedValue =
            type === "number" ? parseInt(value, 10) || 0 : value;
        setFormData((prev) =>
            prev ? { ...prev, [name]: processedValue } : null
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        toast
            .promise(updateBook({ id: id!, book: formData }).unwrap(), {
                pending: "Updating book...",
                success: "Book updated successfully!",
                error: "Failed to update book.",
            })
            .then(() => {
                navigate(`/books/${id}`);
            });
    };

    if (isFetching) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
            </div>
        );
    }

    if (error || !formData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center bg-red-50 border border-red-200 rounded-xl p-8 max-w-md">
                    <h2 className="text-xl font-bold text-red-800 mb-2">
                        Book Not Found
                    </h2>
                    <p className="text-gray-600">
                        This book could not be loaded.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Edit Book</h1>
                <p className="text-gray-500 mt-1">
                    Update the details for "{formData.title}".
                </p>
            </header>
            <form
                onSubmit={handleSubmit}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <div className="md:col-span-2">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="author"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Author
                    </label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        value={formData.author || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="genre"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Genre
                    </label>
                    <select
                        name="genre"
                        id="genre"
                        value={formData.genre || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    >
                        {genres.map((g) => (
                            <option key={g} value={g}>
                                {g.replace("_", " ")}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="isbn"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        ISBN
                    </label>
                    <input
                        type="text"
                        name="isbn"
                        id="isbn"
                        value={formData.isbn || ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                        disabled
                    />
                </div>
                <div>
                    <label
                        htmlFor="copies"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Copies
                    </label>
                    <input
                        type="number"
                        name="copies"
                        id="copies"
                        value={formData.copies || 0}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        min="0"
                    />
                </div>
                <div className="md:col-span-2">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description || ""}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>
                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="inline-flex justify-center items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-300"
                    >
                        {isUpdating ? "Updating..." : "Update Book"}
                    </button>
                </div>
            </form>
        </div>
    );
}
