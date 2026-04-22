import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Institution", institutionSchema);