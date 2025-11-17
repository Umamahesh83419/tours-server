const Mongoose = require("mongoose");
const ProductsSchema = Mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  color: String,
  material: String,
  description: String,
  img: String,
});

module.exports = Mongoose.model("products", ProductsSchema);
