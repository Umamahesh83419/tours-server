const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cpassword: String,
  address: String,
});

module.exports = Mongoose.model("users", UserSchema);
