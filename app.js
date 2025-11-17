require("./db");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const OrderDetailsModel = require("./model/orderdetails");
const ProductsModel = require("./model/productsmodel");
const UserDataModel = require("./model/userdatamodel");
const UserModal = require("./model/usermodel");
const usermodel = require("./model/usermodel");
const jwt = require("jsonwebtoken");
const orderdetails = require("./model/orderdetails");

//SIGNUP---REGISTER
app.post("/register", async (req, res) => {
  const { email, password, cpassword, name } = req.body;
  const exist = await UserModal.findOne({ email: email });
  if (exist) {
    return res.status(404).json({ message: "email already existed" });
  }
  if (password != cpassword) {
    return res.status(404).json({ message: "password does not match" });
  }

  const user = new UserModal(req.body);
  const result = await user.save();
  res.send(result);
});

//LOGIN-----
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const exist = await UserModal.findOne({ email: email });
  if (!exist) {
    return res.status(404).json({ message: "email does not exist" });
  }
  if (exist.password !== password) {
    return res.status(400).json({ message: "incorrect password" });
  }

  const payload = {
    user: {
      id: exist._id,
    },
  };

  const token = jwt.sign(payload, "jsonSecret", { expiresIn: "1h" });
  return res.json({ token });
});

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Access denied, No token provided");
  const decoded = jwt.verify(token, "jsonSecret");
  console.log(decoded.user);
  req.user = decoded.user;
  next();
};

app.get("/dashboard", auth, async (req, res) => {
  const exist = await UserModal.findOne({ _id: req.user.id });
  if (!exist) {
    return res.status(400).json({ message: "User not found" });
  } else {
    return res.status(200).send(exist);
  }
});

// -------------products------------
// app.get("/products", async (req, res) => {
//   const products = await ProductsModel.find();
//   res.json({ products });
// });

// app.post("/products", async(req, res) => {
//     const product = new ProductsModel(req.body);
//     const result = await product.save();
//     res.json({ result });
// });

app.post("/products", async (req, res) => {
  try {
    const product = new ProductsModel(req.body);
    const result = await product.save();
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await ProductsModel.findOne({ _id: id });
  res.json({ product });
});

app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await ProductsModel.deleteOne({ _id: id });
  res.json({ product });
});

app.put("/products", async (req, res) => {
  const query = { name: "bhargav" };
  const result = await ProductsModel.updateOne(query, {
    $set: { name: "bhavani", email: "bhavani@gmail.com" },
  });
  res.json({ result });
});

// ---------------usersData--------------

app.get("/usersData", async (req, res) => {
  const usersData = await UserDataModel.find();
  res.json(usersData);
});

app.post("/usersData", async (req, res) => {
  const service = new UserDataModel(req.body);
  const result = await service.save();
  res.json({ result });
});

app.delete("/usersData/:id", async (req, res) => {
  const id = req.params.id;
  const usersData = await UserDataModel.deleteOne({ _id: id });
  res.json({ usersData });
});


// ---------------orderDetails--------------
app.get("/orderDetails", async (req, res) =>{
  const orderDetails = await OrderDetailsModel.find();
  res.json(orderDetails);
}); 

app.post("/orderDetails", async (req, res) =>{
  const orderDetail = new OrderDetailsModel(req.body);
  const result = await orderDetail.save();
  res.json({ result });
});

app.delete("/orderDetails/:id", async (req, res) =>{
  const id = req.params.id;
  const orderDetails = await OrderDetailsModel.deleteOne({ _id: id });
  res.json({ orderDetails });
});

app.listen(5000, () => console.log("API started"));
