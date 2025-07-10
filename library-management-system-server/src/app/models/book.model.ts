import { model, Schema } from "mongoose";
import IBook from "../interfaces/book.interface";

interface IBookModel extends IBook {
    updateAvailability(): Promise<void>;
}

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        author: {
            type: String,
            required: [true, "Author is required"],
            trim: true,
        },
        genre: {
            type: String,
            required: [true, "Genre is required"],
            enum: {
                values: [
                    "FICTION",
                    "NON_FICTION",
                    "SCIENCE",
                    "HISTORY",
                    "BIOGRAPHY",
                    "FANTASY",
                ],
                message:
                    "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
            },
        },
        isbn: {
            type: String,
            required: [true, "ISBN is required"],
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        copies: {
            type: Number,
            required: [true, "Copies is required"],
            min: [0, "Copies must be a positive number"],
        },
        available: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

bookSchema.methods.updateAvailability = async function () {
    this.available = this.copies > 0;
    await this.save();
};

bookSchema.pre("save", function (next: any) {
    this.available = this.copies > 0;
    next();
});



export const Book = model<IBookModel>("Book", bookSchema);
