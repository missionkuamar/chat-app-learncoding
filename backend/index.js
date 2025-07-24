import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // ✅ must import
import cors from "cors";                  // ✅ must import
import connectDb from "./config/db.js";
import useRoute from "./routes/userRoutes.js";
import MessageRouter from "./routes/messageRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// ✅ Connect to database
connectDb();

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// ✅ Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ✅ Routes
app.use("/api/user", useRoute);
app.use("/api/message", MessageRouter);

// ✅ Server listen
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
