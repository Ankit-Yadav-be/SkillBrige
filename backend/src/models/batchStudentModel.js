import mongoose from "mongoose";

const batchStudentSchema = new mongoose.Schema({
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("BatchStudent", batchStudentSchema);