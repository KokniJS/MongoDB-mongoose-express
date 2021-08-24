const mongoose = require("../../../db/db");
const {
  Schema: {
    Types: { ObjectId, Boolean },
  },
} = mongoose; //Number

const Order = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: false,
  },

  order: [
    {
      products: {
        type: ObjectId,
        ref: "Product",
        required: false,
      },
      amout: {
        type: Number,
        require: false,
      },
    },
  ],

  total: {
    type: Number,
    require: false,
  },
  promocode: {
    type: ObjectId,
    ref: "Promocode",
    require: false,
  },

  isDel: { type: Boolean, required: false },
});

module.exports = mongoose.model("Order", Order);
