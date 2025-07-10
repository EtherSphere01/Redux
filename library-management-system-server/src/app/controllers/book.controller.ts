import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import {
    CreateBookZodSchema,
    UpdateBookZodSchema,
} from "../validation/schemas";
import mongoose from "mongoose";

export const bookRoutes = express.Router();

bookRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const validatedData = await CreateBookZodSchema.parseAsync(req.body);

        const newBook = await Book.create(validatedData);

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook,
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
        } else if (error.code === 11000) {
            res.status(400).json({
                success: false,
                message: "ISBN already exists",
                error: error,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Error creating book",
                error: error.message || "Unknown error",
            });
        }
    }
});

bookRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const {
            filter,
            sort = "asc",
            limit = "10",
            sortBy = "createdAt",
        } = req.query;

        let query: any = {};

        if (filter) {
            query.genre = filter;
        }

        const sortObject: any = {};
        sortObject[sortBy as string] = sort === "desc" ? -1 : 1;

        const books = await Book.find(query)
            .sort(sortObject)
            .limit(parseInt(limit as string));

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error retrieving books",
            error: error.message || "Unknown error",
        });
    }
});

bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            res.status(400).json({
                success: false,
                message: "Invalid book ID",
                error: "Invalid ObjectId format",
            });
            return;
        }

        const book = await Book.findById(bookId);

        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                error: "Book with the specified ID does not exist",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error retrieving book",
            error: error.message || "Unknown error",
        });
    }
});

bookRoutes.put("/:bookId", async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            res.status(400).json({
                success: false,
                message: "Invalid book ID",
                error: "Invalid ObjectId format",
            });
            return;
        }

        const validatedData = await UpdateBookZodSchema.parseAsync(req.body);

        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            validatedData,
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                error: "Book with the specified ID does not exist",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
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
        } else if (error.code === 11000) {
            res.status(400).json({
                success: false,
                message: "ISBN already exists",
                error: error,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Error updating book",
                error: error.message || "Unknown error",
            });
        }
    }
});

bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            res.status(400).json({
                success: false,
                message: "Invalid book ID",
                error: "Invalid ObjectId format",
            });
            return;
        }

        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                error: "Book with the specified ID does not exist",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error deleting book",
            error: error.message || "Unknown error",
        });
    }
});
