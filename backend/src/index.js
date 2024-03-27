import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import contactRoutes from "./contacts/contacts.routes.js";
import usersRoutes from "./users/users.routes.js";
import { authenticateToken } from "./users/auth/authenticate.js";
import logger from "./logger.js";
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Define a route
app.use("/api/users", usersRoutes);
app.use("/api/contacts", authenticateToken, contactRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message}`, { error: err.stack });
    res.status(500).send("Something went wrong!");
});
// Db connection
let mongoURL = `mongodb://localhost:27017/connexa_db`;
// connection = connection.replace('localhost','mongo');
console.log(mongoURL);
mongoose
    .connect(mongoURL)
    .then(() =>
        logger.info(
            `${new Date().toISOString()} [info] Connected to DB @ ${mongoURL}`
        )
    )
    .catch((e) => {
        logger.error(`MongoDB connection error: ${e.message}`);
        process.exit(1); // Exit the application if MongoDB connection fails
    });
// logging

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
