import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Optional fields like confirmPassword should be handled during validation only, not stored
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
