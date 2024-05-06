import mongoose from "mongoose";

export const UserRole = {
  ADMIN: 'admin',
  RENTER: 'renter',
  AGENCY: 'agency'
};

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.RENTER, // Set a default role if needed
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
