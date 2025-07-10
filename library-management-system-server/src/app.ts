import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Library Management System API is running!",
    });
});

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        error: `Cannot ${req.method} ${req.originalUrl}`,
    });
});

app.use((error: any, req: Request, res: Response) => {
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message || "Unknown error",
    });
});

export default app;
