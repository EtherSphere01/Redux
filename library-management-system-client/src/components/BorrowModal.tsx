import React, { useState, useEffect } from "react";
import type { IBook } from "../interfaces/book.interface";
import { useBorrowBookMutation } from "../redux/apis/borrowApi";
import { toast } from "react-toastify";

interface BorrowModalProps {
    book: IBook | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function BorrowModal({
    book,
    isOpen,
    onClose,
}: BorrowModalProps) {
    const [borrowBook, { isLoading }] = useBorrowBookMutation();
    const [quantity, setQuantity] = useState(1);
    const getDefaultDueDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 14);
        return date.toISOString().split("T")[0];
    };
    const [dueDate, setDueDate] = useState(getDefaultDueDate());

    useEffect(() => {
        if (isOpen) {
            setQuantity(1);
            setDueDate(getDefaultDueDate());
        }
    }, [isOpen]);

    if (!isOpen || !book) return null;

    const handleConfirmBorrow = async () => {
        if (quantity <= 0) {
            toast.error("Quantity must be at least 1.");
            return;
        }
        if (quantity > book.copies) {
            toast.error(`Only ${book.copies} copies are available.`);
            return;
        }

        toast
            .promise(
                borrowBook({
                    book: book._id!,
                    quantity,
                    dueDate: new Date(dueDate),
                }).unwrap(),
                {
                    pending: "Processing borrow request...",
                    success: `Successfully borrowed "${book.title}"!`,
                    error: "Failed to borrow book.",
                }
            )
            .then(() => {
                onClose();
            });
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900">
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
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={handleConfirmBorrow}
                        disabled={isLoading}
                        className="w-full inline-flex justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 disabled:bg-purple-300"
                    >
                        {isLoading ? "Processing..." : "Confirm & Borrow"}
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
