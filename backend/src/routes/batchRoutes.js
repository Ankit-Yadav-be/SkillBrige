import express from "express";
import {
  createBatch,
  generateInvite,
  getInstitutionBatches,
  getTrainerBatches,
  joinBatch,
} from "../controllers/batchController.js";

import authMiddleware from "../middlewares/authMiddlewares.js";
import authorizeRoles from "../middlewares/roleMiddlewares.js";

const router = express.Router();

// Create Batch
router.post(
  "/",
  authMiddleware,
  authorizeRoles("trainer", "institution"),
  createBatch
);

router.get(
  "/trainer",
  authMiddleware,
  authorizeRoles("trainer"),
  getTrainerBatches
);

// Generate Invite
router.post(
  "/:id/invite",
  authMiddleware,
  authorizeRoles("trainer"),
  generateInvite
);

// Join Batch
router.post(
  "/join",
  authMiddleware,
  authorizeRoles("student"),
  joinBatch
);

router.get(
  "/institution",
  authMiddleware,
  authorizeRoles("institution"),
  getInstitutionBatches
);

export default router;