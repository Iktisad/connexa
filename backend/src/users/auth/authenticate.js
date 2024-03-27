import jwt from "jsonwebtoken";
// Middleware to authenticate JWT token
export const JWT_SECRET = "ConnexaApp_2024_CreatedBy_IFK";
export const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};
