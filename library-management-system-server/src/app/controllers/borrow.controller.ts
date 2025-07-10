import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";
import { CreateBorrowZodSchema } from "../validation/schemas";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const validatedData = await CreateBorrowZodSchema.parseAsync(req.body);

        const book = await Book.findById(validatedData.book);

        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                error: "Book with the specified ID does not exist",
            });
            return;
        }

        if (book.copies < validatedData.quantity) {
            res.status(400).json({
                success: false,
                message: "Insufficient copies available",
                error: `Only ${book.copies} copies available, but ${validatedData.quantity} requested`,
            });
            return;
        }

        const newBorrow = await Borrow.create(validatedData);

        book.copies -= validatedData.quantity;

        await book.updateAvailability();

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: newBorrow,
        });
    } catch (error: any) {
        if (error.name === "ZodError") {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                error: {
                    name: "ValidationError",
                    errors: error.errors,
                },
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Error borrowing book",
                error: error.message || "Unknown error",
            });
        }
    }
});

borrowRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const borrowedBooksSummary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails",
                },
            },
            {
                $unwind: "$bookDetails",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);

        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrowedBooksSummary,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error retrieving borrowed books summary",
            error: error.message || "Unknown error",
        });
    }
});
