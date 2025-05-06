import { verifyToken } from "../configs/jwt-config.js";
import { User } from "../schemas/user.schema.js";


export const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing or malformed" });
    }


    try {
        const decoded = await verifyToken(authHeader);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token", error: error.message });
    }
};
