import mongoose from "mongoose";

const AgencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    logo: {
      type: [Buffer], // Array of image buffers
      required: true,
  },
  },
  { timestamps: true }
);

export const Agency = mongoose.model("Agency", AgencySchema);
