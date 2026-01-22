import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state, actions: PayloadAction<number>) => {
            state.count += actions.payload;
        },
        decrement: (state, actions: PayloadAction<number>) => {
            state.count -= actions.payload;
        },
    },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
