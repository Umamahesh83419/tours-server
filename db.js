const Mongoose = require("mongoose");
const url = "mongodb+srv://umam83419:xn0YVOUxTyHPX04S@sample.4gdkwjv.mongodb.net/tours?retryWrites=true&w=majority&appName=sample"

Mongoose.connect(url)
.then(()=>{
    console.log("connected to mongoose..")
})
.catch((err)=>console.log(err))