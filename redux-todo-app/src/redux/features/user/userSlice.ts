import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../../interfaces/userInterface";

const initialState = {
    user: [
        {
            id: nanoid(),
            name: "Naimur Rahman",
            email: "naimur@gmail.com",
            age: 25,
            address: "Dhaka, Bangladesh",
            phone: "+8801234567890",
            isActive: true,
            createdAt: "2023-10-01T00:00:00Z",
        },
    ] as IUser[],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        showUser: (state, actions: PayloadAction<IUser>) => {
            const id = nanoid();
            const task = { ...actions.payload, id };
            state.user.push(task);
        },
    },
});

export const { showUser } = userSlice.actions;

export default userSlice.reducer;
