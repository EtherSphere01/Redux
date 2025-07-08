import { useEffect } from "react";
import "./App.css";
import type { IUser } from "./interfaces/userInterface";
import { showUser } from "./redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "./redux/hook";

function App() {
    const newUser: IUser = {
        id: "1",
        name: "John Doe",
        email: "john@gmail.com",
        age: 30,
        address: "New York, USA",
        phone: "+1234567890",
        isActive: true,
        createdAt: "2028-10-01T00:00:00Z",
    };

    const data = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const handleOnClick = () => {
        console.log("Button clicked!");
        dispatch(showUser(newUser));
        console.log("Dispatch Function:", dispatch);
    };

    useEffect(() => {
        console.log("User Data Updated:", data);
    }, [data]);

    return (
        <div>
            <button onClick={handleOnClick}>
                <span>Click Me</span>
            </button>

            <h1>
                {data.user.length > 0 ? "User Data Available" : "No User Data"}
                {data.user.map((user) => (
                    <div key={user.id}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Age: {user.age}</p>
                        <p>Address: {user.address}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Active: {user.isActive ? "Yes" : "No"}</p>
                        <p>
                            Created At:{" "}
                            {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </h1>
        </div>
    );
}

export default App;
