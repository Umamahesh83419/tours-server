require("./db")
const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors())
app.use(express.json())
const EnquiryModel = require("./model/enquirymodel")
const PackageModel = require("./model/packagemodel")


// -------------ENQUIRIES------------
app.get("/enquiries", async(req,res)=>{
    const enquiries = await EnquiryModel.find()
    res.json({enquiries})
})

// app.post("/enquiries", async(req, res) => {
//     const enquiry = new EnquiryModel(req.body);
//     const result = await enquiry.save();
//     res.json({ result });
// });


app.post("/enquiries", async (req, res) => {
    try {
        const enquiry = new EnquiryModel(req.body);
        const result = await enquiry.save();
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.get("/enquiries/:id",async (req,res)=>{
    const id = req.params.id;
    const enquiry = await EnquiryModel.findOne({_id: id});
    res.json({enquiry})
})

app.delete("/enquiries/:id",async (req,res)=>{
    const id = req.params.id;
    const enquiry = await EnquiryModel.deleteOne({_id: id});
    res.json({enquiry})
})

app.put("/enquiries", async (req,res)=>{
    const query = {name:"bhargav"}
    const result = await EnquiryModel.updateOne(query,{$set:{name:"bhavani",email:"bhavani@gmail.com"}})
    res.json({result})
})


// ---------------package--------------

app.get("/package", async (req, res) => {
    const package = await PackageModel.find();
    res.json(package);
});

app.post("/package", async (req, res) => {
    const service = new PackageModel(req.body);
    const result = await service.save();
    res.json({ result });
});

app.delete("/package/:id", async (req, res) => {
    const id = req.params.id;
    const package = await PackageModel.deleteOne({ _id: id });
    res.json({ package });
});




app.listen(5000,()=>console.log("API started"));
