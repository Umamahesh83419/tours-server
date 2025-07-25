const Mongoose = require("mongoose");
  const EnquirySchema = Mongoose.Schema({
    name : String,
    email : String,
    Num : Number
 })

 module.exports = Mongoose.model("enquiries",EnquirySchema)