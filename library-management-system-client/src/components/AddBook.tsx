import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../redux/apis/bookApi";
import { toast } from "react-toastify";
import type { IBook } from "../interfaces/book.interface";

export default function AddBook() {
    const navigate = useNavigate();
    const [createBook, { isLoading }] = useCreateBookMutation();

    const [formData, setFormData] = useState<Partial<IBook>>({
        title: "",
        author: "",
        genre: "FICTION",
        isbn: "",
        description: "",
        copies: 1,
        available: true,
    });

    const genres = [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
    ];

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value, type } = e.target;
        const newFormData = { ...formData };
        (newFormData as any)[name] =
            type === "number" ? parseInt(value, 10) || 0 : value;
        setFormData(newFormData);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.author || !formData.isbn) {
            toast.error("Please fill in the Title, Author, and ISBN fields.");
            return;
        }

        toast
            .promise(createBook(formData).unwrap(), {
                pending: "Adding new book...",
                success: "Book added successfully!",
                error: {
                    render({ data }: any) {
                        return data?.data?.message || "Failed to add book.";
                    },
                },
            })
            .then(() => {
                navigate("/");
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Add a New Book
                </h1>
                <p className="text-gray-500 mt-1">
                    Fill out the form below to add a new book to the library
                    collection.
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
                        value={formData.title}
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
                        value={formData.author}
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
                        value={formData.genre}
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
                        value={formData.isbn}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        required
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
                        value={formData.copies}
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
                        Description (Optional)
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>
                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex justify-center items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-300"
                    >
                        {isLoading ? (
                            <>
                                {" "}
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    {" "}
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>{" "}
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>{" "}
                                </svg>{" "}
                                Adding...{" "}
                            </>
                        ) : (
                            "Add Book"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
