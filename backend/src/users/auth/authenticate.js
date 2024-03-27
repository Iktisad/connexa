import jwt from "jsonwebtoken";
// Middleware to authenticate JWT token
export const JWT_SECRET = "ConnexaApp_2024_CreatedBy_IFK";
export const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token expired or invalid" });
    }
};
