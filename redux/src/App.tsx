import "./App.css";
import { decrement, increment } from "./redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hook";

function App() {
    const dispatch = useAppDispatch();
    const { count } = useAppSelector((state) => state.counter);
    const handleIncrement = () => {
        dispatch(increment(5));
    };
    const handleDecrement = () => {
        dispatch(decrement(5));
    };
    return (
        <>
            <h1>Counter With Redux</h1>
            <button onClick={handleIncrement}>Increment</button>
            <div>
                <h2>{count}</h2>
            </div>
            <button onClick={handleDecrement}>Decrement</button>
            <div></div>
        </>
    );
}

export default App;
