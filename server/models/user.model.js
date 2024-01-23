const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: [true, "Name is required."],
    },
    email: {
      type: Schema.Types.String,
      required: [true, "Email is required."],
      unique: [true, "This email is already used by others user."],
      trim: true,
    },
    password: {
      type: Schema.Types.String,
      required: [true, "Password is required."],
      minLength: [8, "Password should be greater than 8 characters."],
    },
    role: {
      type: Schema.Types.String,
      default: "user",
      enum: ["user", "admin"],
    },
    additionalDetails: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    token: {
      type: Schema.Types.String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    profileImage: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
