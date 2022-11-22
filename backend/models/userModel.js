const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    pwd: { type: String, required: true },
  },
  { timestrap: true }
);

module.export = mongoose.model("user", userSchema);
