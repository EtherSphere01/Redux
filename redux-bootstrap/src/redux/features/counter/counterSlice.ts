import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
};

const counter = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state, action) => {
            state.count += action.payload;
        },
        decrement: (state) => {
            state.count -= 1;
        },
    },
});

export const { increment, decrement } = counter.actions;

export default counter.reducer;
