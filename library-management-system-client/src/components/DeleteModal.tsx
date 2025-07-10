import React from "react";

// The props interface defines what the component expects to receive.
interface DeleteModalProps {
    // --- FIX: The 'isOpen' prop is now included in the interface ---
    // This prop controls whether the modal is visible or not.
    isOpen: boolean;
    bookTitle: string;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteModal({
    isOpen,
    bookTitle,
    onClose,
    onConfirm,
}: DeleteModalProps) {
    // If the modal is not set to be open, render nothing.
    if (!isOpen) {
        return null;
    }

    return (
        // Modal backdrop, which closes the modal when clicked.
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            {/* Modal Panel, which stops click propagation to prevent closing. */}
            <div
                className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center">
                    {/* Warning Icon */}
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"
                            />
                        </svg>
                    </div>
                    {/* Modal Content */}
                    <div className="mt-3">
                        <h3
                            className="text-lg font-semibold leading-6 text-gray-900"
                            id="modal-title"
                        >
                            Delete Book
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Are you sure you want to permanently delete{" "}
                                <span className="font-medium">
                                    "{bookTitle}"
                                </span>
                                ?
                                <br />
                                This action cannot be undone.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Action Buttons */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="w-full inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                    >
                        Delete
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
