import App from "../App";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                // path: "about",
                element: <div>About Page</div>,
            },
        ],
    },
]);
export default router;
