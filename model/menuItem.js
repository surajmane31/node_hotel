const mongoose = require("mongoose");

const menuItemScema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  teste: { type: String, enum: ["sweet", "spice", "sour"] },
  is_drink: {
    type: Boolean,
    default: false,
  },
});


const MenuItem = mongoose.model("MenuItem", menuItemScema);

module.exports = MenuItem;
