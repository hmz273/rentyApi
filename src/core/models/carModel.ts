import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: [Buffer], // Array of image buffers
      required: true,
  },
  },
  { timestamps: true }
);

export const Car = mongoose.model("Car", CarSchema);
