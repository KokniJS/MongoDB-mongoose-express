const mongoose = require("../../../db/db");
const {
  Schema: {
    Types: { String, Number, ObjectId },
  },
} = mongoose;

const Product = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: false,
  },
  productName: { type: String, required: false },
  price: { type: Number, required: false },
  quanitity: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Product", Product);
