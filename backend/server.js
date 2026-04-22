import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import batchRoutes from "./src/routes/batchRoutes.js";
import sessionRoutes from "./src/routes/sessionRoutes.js";
import attendanceRoutes from "./src/routes/attendenceRoutes.js";
import summaryRoutes from "./src/routes/summaryRoutes.js";
import institutionRoutes from "./src/routes/institutionRoutes.js";
dotenv.config();

connectDB();


const app = express();

app.use(
  cors({
    origin: "https://skill-brige-a8l3.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Attendance Management System API");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/institutions", institutionRoutes);


// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;