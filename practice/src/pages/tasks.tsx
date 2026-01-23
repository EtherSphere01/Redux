import { useAppDispatch, useAppSelector } from "@/Redux/hook";

export default function tasks() {
    const tasks = useAppSelector((state) => state.todo.tasks);
    return (
        <div>
            <h1>Showing All Tasks</h1>
            <div></div>
        </div>
    );
}
