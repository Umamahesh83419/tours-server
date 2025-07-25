const mongoose = require("mongoose");

const PackageSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number
});

module.exports = mongoose.model("package", PackageSchema);
