import type { ITask } from "@/type";
import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
    tasks: ITask[];
}

const initialState: InitialStateType = {
    tasks: [
        {
            id: "sdaioseonvav",
            title: "Learn Redux Toolkit",
            description: "Understand how to use Redux Toolkit with TypeScript",
            dueDate: "2023-12-31",
            isCompleted: false,
            priority: "High" as "High" | "Medium" | "Low",
        },
    ],
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
});

export default taskSlice.reducer;
