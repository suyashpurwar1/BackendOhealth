import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    panNumber: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      sparse: true,
    },
    mobile: {
      type: String,
      sparse: true,
    },
    address: {
      type: String,
      required: false,
    },
    dob: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
