import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    IBorrow,
    IBorrowSummary,
} from "../../interfaces/borrow.interface";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export const borrowApi = createApi({
    reducerPath: "borrowApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
    }),
    tagTypes: ["Borrow"],
    endpoints: (builder) => ({
        borrowBook: builder.mutation<ApiResponse<IBorrow>, Partial<IBorrow>>({
            query: (borrow) => ({
                url: "/borrow",
                method: "POST",
                body: borrow,
            }),
            invalidatesTags: ["Borrow"],
        }),
        getBorrowSummary: builder.query<ApiResponse<IBorrowSummary[]>, void>({
            query: () => "/borrow",
            providesTags: ["Borrow"],
        }),
    }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
