const mongoose = require("mongoose");

const userDataSchema = mongoose.Schema({
    fullName: String,
    email: String,
    phone: Number,
    address: String,
    city: String,
    state: String,
    code: Number
});

module.exports = mongoose.model("userData", userDataSchema);
