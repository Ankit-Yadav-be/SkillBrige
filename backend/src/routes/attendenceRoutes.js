import express from "express";
import { markAttendance } from "../controllers/sessionController.js";

import authMiddleware from "../middlewares/authMiddlewares.js";
import authorizeRoles from "../middlewares/roleMiddlewares.js";

const router = express.Router();

// Mark Attendance
router.post(
  "/mark",
  authMiddleware,
  authorizeRoles("student"),
  markAttendance
);

export default router;