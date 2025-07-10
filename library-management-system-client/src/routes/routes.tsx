import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../components/Home";
import AddBook from "../components/AddBook";
import BorrowSummary from "../components/BorrowSummary";
import BookDetails from "../components/BookDetails";
import EditBook from "../components/EditBook";
import BorrowBook from "../components/BorrowBook";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "create-book",
                element: <AddBook />,
            },
            {
                path: "add-book",
                element: <AddBook />,
            },
            {
                path: "books/:id",
                element: <BookDetails />,
            },
            {
                path: "books/:id/edit",
                element: <EditBook />,
            },
            {
                path: "edit-book/:id",
                element: <EditBook />,
            },
            {
                path: "borrow/:bookId",
                element: <BorrowBook />,
            },
            {
                path: "borrow-summary",
                element: <BorrowSummary />,
            },
        ],
    },
]);
