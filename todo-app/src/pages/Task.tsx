import { selectTask } from "@/redux/features/task/taskSlice";
import { useAppSelector } from "@/redux/hook";

const Task = () => {
    const tasks = useAppSelector(selectTask);
    return <div>this is task</div>;
};

export default Task;
