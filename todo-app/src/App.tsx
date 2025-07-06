import { Outlet } from "react-router";

function App() {
    return (
        <div>
            <div>
                <h1>Todo App</h1>
                <Outlet />
            </div>
        </div>
    );
}

export default App;
