import React, { useState, useEffect } from "react";
import type { IBook } from "../interfaces/book.interface";
import { useBorrowBookMutation } from "../redux/apis/borrowApi";
import { toast } from "react-toastify";

interface BorrowModalProps {
    book: IBook | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function BorrowBook({
    book,
    isOpen,
    onClose,
}: BorrowModalProps) {
    const [borrowBook, { isLoading }] = useBorrowBookMutation();
    const [quantity, setQuantity] = useState(1);

    // Default due date to 14 days from now
    const getDefaultDueDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 14);
        return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    };

    const [dueDate, setDueDate] = useState(getDefaultDueDate());

    // Reset form state when the modal is opened for a new book
    useEffect(() => {
        if (isOpen) {
            setQuantity(1);
            setDueDate(getDefaultDueDate());
        }
    }, [isOpen]);

    if (!isOpen || !book) return null;

    const handleBorrow = async () => {
        if (quantity <= 0) {
            toast.error("Quantity must be at least 1.");
            return;
        }
        if (quantity > book.copies) {
            toast.error(`Only ${book.copies} copies are available.`);
            return;
        }

        try {
            await borrowBook({
                book: book._id!,
                quantity,
                dueDate: new Date(dueDate),
            }).unwrap();
            toast.success(
                `Successfully borrowed ${quantity} cop${
                    quantity > 1 ? "ies" : "y"
                } of "${book.title}"!`
            );
            onClose(); // Close the modal on success
        } catch (err) {
            toast.error("Failed to borrow the book. Please try again.");
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose} // Close on backdrop click
        >
            <div
                className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()} // Prevent closing on panel click
            >
                <div className="text-center">
                    <h3
                        className="text-xl font-semibold text-gray-900"
                        id="modal-title"
                    >
                        Borrow Book
                    </h3>
                    <p className="mt-2 text-gray-500">
                        You are borrowing:{" "}
                        <span className="font-bold text-purple-700">
                            "{book.title}"
                        </span>
                    </p>
                </div>

                <div className="mt-6 space-y-4">
                    {/* Quantity Input */}
                    <div>
                        <label
                            htmlFor="quantity"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Quantity (Available: {book.copies})
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(parseInt(e.target.value, 10))
                            }
                            min="1"
                            max={book.copies}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>

                    {/* Due Date Input */}
                    <div>
                        <label
                            htmlFor="dueDate"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Due Date
                        </label>
                        <input
                            type="date"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]} // Today's date
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={handleBorrow}
                        disabled={isLoading}
                        className="w-full inline-flex justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 disabled:bg-purple-300"
                    >
                        {isLoading ? "Borrowing..." : "Confirm Borrow"}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
