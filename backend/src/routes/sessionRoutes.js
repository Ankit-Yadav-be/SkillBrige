import express from "express";
import {
  createSession,
  getSessionAttendance,
  getSessions,
  getSessionsByBatch,
} from "../controllers/sessionController.js";

import authMiddleware from "../middlewares/authMiddlewares.js";
import authorizeRoles from "../middlewares/roleMiddlewares.js";

const router = express.Router();

// Create Session
router.post(
  "/",
  authMiddleware,
  authorizeRoles("trainer"),
  createSession
);

// Get Attendance for Session
router.get(
  "/:id/attendance",
  authMiddleware,
  authorizeRoles("trainer"),
  getSessionAttendance
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles("student"),
  getSessions
);

router.get(
  "/batch/:batchId",
  authMiddleware,
  authorizeRoles("trainer"),
  getSessionsByBatch
);


export default router;