import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    tasks: ITask[];
}
const initialState: InitialState = {
    tasks: [
        {
            id: "",
            title: "",
            description: "",
            dueDate: "",
            isCompleted: false,
            priority: "High",
        },
    ],
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
});

export const selectTask = (state: RootState) => {
    return state.todo.tasks;
};

export default taskSlice.reducer;
