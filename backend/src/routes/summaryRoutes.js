import express from "express";
import {
  getBatchSummary,
  getInstitutionSummary,
  getProgrammeSummary,
} from "../controllers/summaryController.js";

import authMiddleware from "../middlewares/authMiddlewares.js";
import authorizeRoles from "../middlewares/roleMiddlewares.js";

const router = express.Router();

//  Batch Summary
router.get(
  "/batches/:id",
  authMiddleware,
  authorizeRoles("institution"),
  getBatchSummary
);

//  Institution Summary
router.get(
  "/institutions/:id",
  authMiddleware,
  authorizeRoles("manager"),
  getInstitutionSummary
);

//  Programme Summary
router.get(
  "/programme",
  authMiddleware,
  authorizeRoles("manager", "monitor"),
  getProgrammeSummary
);

export default router;