import bcrypt from "bcrypt";
import User from "./users.model.js";
import logger from "../logger.js";

import Contact from "../contacts/contact.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./auth/authenticate.js";

export default () => {
    const signupUser = async (req, res, next) => {
        const { email, password } = req.body;
        try {
            // Check if the user already exists
            const userCount = await User.countDocuments({ email });

            if (userCount > 0) {
                logger.warn("User already exists");
                return res.status(400).json({ message: "User already exists" });
            }

            // Hash the password before saving to the database
            const hashedPassword = bcrypt.hashSync(password, 10);

            // Add the user to the database
            req.body.password = hashedPassword;
            console.log(req.body);

            await User.create(req.body);
            logger.info("User created successfully");

            return res
                .status(201)
                .json({ message: "User created successfully" });
        } catch (error) {
            next(error);
        }
    };

    const loginUser = async (req, res, next) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        try {
            if (!user) {
                logger.warn("User not found");
                return res.status(404).json({ message: "User not found" });
            }
            // Check password
            if (!bcrypt.compareSync(password, user.password)) {
                logger.warn("Invalid credentials");
                return res.status(401).json({ message: "Invalid credentials" });
            }
            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, username: user.name, email: user.email },
                JWT_SECRET,
                {
                    expiresIn: "3h",
                }
            );
            logger.info("User logged in successfully");
            return res.json({ token });
        } catch (error) {
            // Handle any unexpected errors
            next(error);
        }
    };

    const getAllUsers = async (req, res, next) => {
        let statusCode = 200;
        try {
            const users = await User.find().lean();
            if (users.length < 0) {
                statusCode = 404;
            }
            logger.info("Fetching all users");
            return res.status(statusCode).json({
                status: statusCode,
                data: users || 0,
                message:
                    statusCode === 200
                        ? "Displaying all results!"
                        : statusCode + " No results found",
            });
        } catch (error) {
            // Handle any unexpected errors
            next(error);
        }
    };

    const getOneUser = async (req, res, next) => {
        const { id } = req.body;
        try {
            const user = await User.findById(id);

            if (!user) {
                logger.warn("User not found");
                return res.status(404).json({ message: "User not found" });
            }
            logger.info("Fetching user by ID");
            res.json(user);
        } catch (error) {
            // Handle any unexpected errors
            next(error);
        }
    };

    const updateUser = async (req, res, next) => {
        const { id } = req.params;
        const { name, password } = req.body;
        try {
            // Find the user in the database
            const user = await User.findById(id);

            if (!user) {
                logger.warn("User not found");
                return res.status(404).json({ message: "User not found" });
            }

            // Update the user's password
            user.password = bcrypt.hashSync(password, 10);
            user.name = name;
            user.save();
            logger.info("User updated successfully");
            res.json({ message: "User updated successfully" });
        } catch (error) {
            // Handle any unexpected errors
            next(error);
        }
    };

    const deleteUser = async (req, res, next) => {
        const { id } = req.params;
        console.log(id);
        try {
            const user = await User.findByIdAndDelete(id);
            // Find the index of the user in the array
            if (!user) {
                logger.warn("User not found");
                return res.status(404).json({ message: "User not found" });
            }
            // for contacts, we delete them here
            await Contact.deleteMany({ user: id });
            logger.info("User and their contacts deleted");
            return res.status(200).json({
                message: "User and their contacts deleted",
            });
        } catch (error) {
            // Handle any unexpected errors
            next(error);
        }
    };

    return {
        signupUser,
        loginUser,
        getAllUsers,
        getOneUser,
        updateUser,
        deleteUser,
    };
};
