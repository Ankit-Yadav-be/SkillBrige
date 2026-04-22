import mongoose from "mongoose";

const batchTrainerSchema = new mongoose.Schema({
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
  },
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("BatchTrainer", batchTrainerSchema);