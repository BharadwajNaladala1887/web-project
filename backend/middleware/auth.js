import { findUserWithId } from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const isAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ error: "Access denied" });

    // Extract the JWT from the Bearer token
    const tokenString = token.split(" ")[1];
    if (!tokenString) return res.status(403).json({ error: "Access denied" });

    // Verify the token using the secret key
    const decoded = jwt.verify(tokenString, process.env.SECRET_KEY);
    const user = await findUserWithId({ id: decoded.id });

    if (!user) return res.status(401).json({ error: "Unauthorized request" });
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ error: 'Invalid Token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token Expired' });
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
