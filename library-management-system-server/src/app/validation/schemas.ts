import z from "zod";

export const CreateBookZodSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.enum(
        [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
        ],
        {
            errorMap: () => ({
                message:
                    "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
            }),
        }
    ),
    isbn: z.string().min(1, "ISBN is required"),
    description: z.string().optional(),
    copies: z.number().min(0, "Copies must be a positive number"),
    available: z.boolean().optional(),
});

export const UpdateBookZodSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    author: z.string().min(1, "Author is required").optional(),
    genre: z
        .enum(
            [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            {
                errorMap: () => ({
                    message:
                        "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
                }),
            }
        )
        .optional(),
    isbn: z.string().min(1, "ISBN is required").optional(),
    description: z.string().optional(),
    copies: z.number().min(0, "Copies must be a positive number").optional(),
    available: z.boolean().optional(),
});

export const CreateBorrowZodSchema = z.object({
    book: z.string().min(1, "Book ID is required"),
    quantity: z.number().min(1, "Quantity must be a positive number"),
    dueDate: z
        .string()
        .transform((str: any) => new Date(str))
        .refine((date: any) => !isNaN(date.getTime()), {
            message: "Invalid date format",
        })
        .refine((date: any) => date > new Date(), {
            message: "Due date must be in the future",
        }),
});
