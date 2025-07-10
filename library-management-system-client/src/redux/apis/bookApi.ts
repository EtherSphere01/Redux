import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook } from "../../interfaces/book.interface";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export const bookApi = createApi({
    reducerPath: "bookApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
    }),
    tagTypes: ["Book"],
    endpoints: (builder) => ({
        getAllBooks: builder.query<ApiResponse<IBook[]>, void>({
            query: () => "/books",
            providesTags: ["Book"],
        }),
        getBookById: builder.query<ApiResponse<IBook>, string>({
            query: (id) => `/books/${id}`,
            providesTags: ["Book"],
        }),
        createBook: builder.mutation<ApiResponse<IBook>, Partial<IBook>>({
            query: (book) => ({
                url: "/books",
                method: "POST",
                body: book,
            }),
            invalidatesTags: ["Book"],
        }),
        updateBook: builder.mutation<
            ApiResponse<IBook>,
            { id: string; book: Partial<IBook> }
        >({
            query: ({ id, book }) => ({
                url: `/books/${id}`,
                method: "PUT",
                body: book,
            }),
            invalidatesTags: ["Book"],
        }),
        deleteBook: builder.mutation<ApiResponse<void>, string>({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Book"],
        }),
    }),
});

export const {
    useGetAllBooksQuery,
    useGetBookByIdQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = bookApi;
