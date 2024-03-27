import express from "express";
import usersController from "./users.controller.js";
import logger from "../logger.js";
const router = express.Router();

const user = usersController();
router.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
});
// Create a user
router.post("/signup", user.signupUser);

// get one users
router.post("/login", user.loginUser);

// Get all user
router.get("/", user.getAllUsers);

//get user by username
router.get("/:id", user.getOneUser);

// Update a user
router.put("/:id", user.updateUser);

// Delete a user
router.delete("/:id", user.deleteUser);

export default router;
