import "./App.css";
import { decrement, increment } from "./Redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./Redux/hook";

function App() {
    const dispatch = useAppDispatch();
    const { count } = useAppSelector((state) => state.counter);
    const handleIncrement = (value: number) => {
        dispatch(increment(value));
    };
    const handleDecrement = (value: number) => {
        dispatch(decrement(value));
    };
    return (
        <>
            <div>
                <h1>Counter With Redux</h1>
                <button onClick={() => handleIncrement(5)}>Increment</button>

                <h2>{count}</h2>

                <button onClick={() => handleDecrement(5)}>Decrement</button>
            </div>
        </>
    );
}

export default App;
