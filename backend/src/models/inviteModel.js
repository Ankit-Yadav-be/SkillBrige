import mongoose from "mongoose";

const inviteSchema = new mongoose.Schema(
  {
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
    },
    isReusable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Invite", inviteSchema);