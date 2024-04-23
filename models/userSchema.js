const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    phone: { type: String },
    address: { type: String },
    state: { type: String },
    town: { type: String },
    zip: { type: String },
    dob: { type: String },
  },
  {
    collection: "Users",
  }
);

mongoose.model("Users", userSchema);
