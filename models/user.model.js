const mongoose = require("mongoose");
const Roles = require("../utils/roles");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: "Please enter a valid phone number",
      },
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v === this.password;
        },
        message: "Password and Confirm Password do not match",
      },
    },
    role: {
      type: String,
      required: true,
      enum: [Roles.ADMIN, Roles.USER],
      default: Roles.USER,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: "uploads/man.png",
    },
  },
  { versionKey: false },
);
const Users = mongoose.model("Users", userSchema);
module.exports = Users;
