import { useGetBorrowSummaryQuery } from "../redux/apis/borrowApi";
import type { IBorrowSummary } from "../interfaces/borrow.interface";

export default function BorrowSummary() {
    const { data: response, isLoading, error } = useGetBorrowSummaryQuery();

    const borrowedBooks: IBorrowSummary[] = (response?.data || []).filter(
        (item) => item && item.book && typeof item.totalQuantity === "number"
    );

    const totalCopies = borrowedBooks.reduce(
        (sum, item) => sum + item.totalQuantity,
        0
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="text-center bg-red-50 border border-red-200 rounded-xl p-8 max-w-md">
                    <h2 className="text-xl font-bold text-red-800 mb-2">
                        Error Loading Summary
                    </h2>
                    <p className="text-red-600">
                        Please try refreshing the page.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-800">
                    Borrow Summary
                </h1>
                <p className="text-gray-500 mt-1">
                    An overview of all borrowed books in the library.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-500">
                        Unique Books Borrowed
                    </h3>
                    <p className="text-4xl font-bold text-purple-600 mt-2">
                        {borrowedBooks.length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-500">
                        Total Copies Borrowed
                    </h3>
                    <p className="text-4xl font-bold text-purple-600 mt-2">
                        {totalCopies}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Borrowed Books Details
                    </h2>
                </div>
                {borrowedBooks.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        ISBN
                                    </th>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase tracking-wider text-right">
                                        Borrowed Copies
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {borrowedBooks.map((item) => (
                                    <tr key={item.book.isbn}>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                            {item.book.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                            {item.book.isbn}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-purple-700 text-lg">
                                            {item.totalQuantity}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center p-12">
                        <p className="text-gray-500">
                            No books have been borrowed yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
