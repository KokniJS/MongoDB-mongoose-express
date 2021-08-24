const mongoose = require("../../../db/db");
const {
  Schema: {
    Types: { ObjectId },
  },
} = mongoose;

const Employee = mongoose.Schema({
  delivery: [
    {
      type: ObjectId,
      ref: "Delivery",
      required: false,
    },
  ],
});

module.exports = mongoose.model("Employee", Employee);
