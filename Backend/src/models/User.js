import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["patient", "hospital"],
      required: true,
    },
    hospitalName: {
      type: String,
      required: function () {
        return this.userType === "hospital";
      }, 
    },
    hospitalAddress: {
      type: String,
      required: function () {
        return this.userType === "hospital";
      },
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

export default User
