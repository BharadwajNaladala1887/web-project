import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import followRouter from "./routes/follow.js";
import { isAuth } from "./middleware/auth.js";
import postRouter from "./routes/post.js";
import likeRouter from "./routes/like.js";
import commentRouter from "./routes/comment.js";

// CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); // Enable CORS for all routes
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/assets"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ROUTES WITH FILES
app.post("/uploadfile", upload.single("picture"), (req, res) => {
  const filename = req.file.filename;
  return res.status(201).json({ filename });
});

// ROUTES
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/follow", isAuth, followRouter);
app.use("/post", postRouter);
app.use("/like", likeRouter);
app.use("/comment", commentRouter);

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// MONGOOSE SETUP
const PORT = process.env.PORT || 8002;

console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process with an error code
  });

export default app;
