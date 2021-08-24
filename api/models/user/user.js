const mongoose = require("../../../db/db");
const {
  Schema: {
    Types: { String, Number },
  },
} = mongoose;

const User = mongoose.Schema({
  username: { type: String, required: false },
  email: { type: String, require: false },
  phoneNumber: { type: Number, require: false },
  password: { type: String, require: false },
  role: { type: String, require: false },
});

module.exports = mongoose.model("User", User);
