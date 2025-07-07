import { Outlet } from "react-router";
import { ModeToggle } from "./components/mode-toggler";

function App() {
    return (
        <div>
            <div>
                <h1>
                    <ModeToggle></ModeToggle>
                </h1>
                <Outlet />
            </div>
        </div>
    );
}

export default App;
