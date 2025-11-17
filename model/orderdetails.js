const Mongoose = require("mongoose");
const OrderDetailsSchema = Mongoose.Schema({
  productId: String,
  id: String,
  price: Number,
  email: String,
  Number: Number,
  img: String,
  address: String,
  city: String,
  state: String,
  code: Number
});

module.exports = Mongoose.model("orderDetails", OrderDetailsSchema);