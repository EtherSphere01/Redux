import type { IBook } from "./book.interface";

export interface IBorrow {
    book: string | IBook;
    quantity: number;
    dueDate: Date;
}

export interface IBorrowSummary {
    book: {
        title: string;
        isbn: string;
    };
    totalQuantity: number;
}
