import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let server: Server;

const PORT = process.env.PORT || 5000;

async function main() {
    try {
        const connectionString = process.env.MONGODB_CONNECTION_STRING;
        console.log("Connection string exists:", !!connectionString);

        if (!connectionString) {
            throw new Error(
                "MONGODB_CONNECTION_STRING environment variable is not set"
            );
        }

        await mongoose.connect(connectionString);
        console.log("Connected to MongoDB successfully!");

        server = app.listen(PORT, () => {
            console.log(
                `Library Management System API is running on http://localhost:${PORT}`
            );
        });
    } catch (error) {
        console.error("An error occurred:", error);
        process.exit(1);
    }
}

main();
