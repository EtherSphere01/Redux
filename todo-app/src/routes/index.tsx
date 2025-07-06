import App from "@/App";
import Task from "@/pages/Task";
import User from "@/pages/User";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Task />,
            },
            {
                path: "tasks",
                element: <Task />,
            },
            {
                path: "users",
                element: <User />,
            },
        ],
    },
]);
export default router;
