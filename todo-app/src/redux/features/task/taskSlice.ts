import type { ITask } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    task: ITask[];
}
const initialState: InitialState = {
    task: [
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

export default taskSlice.reducer;
