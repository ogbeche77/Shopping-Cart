const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
require('dotenv').config()

//const config = require("config");

const app = express();
app.use(bodyParser.json());

//Connect to Mongo & hide MongoDB URI
mongoose
    .connect(process.env.MONGODB_URI,
        { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("MongoDB is connected")) //shows in terminal to show we are connected
    .catch(err => console.log(err));

const Product = mongoose.model("products", new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableTypes: [String],

}))

app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);

});

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});

//Model for order
const Order = mongoose.model("order", new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    email: String,
    name: String,
    address: String,
    total: Number,
    cartItems: [{
        _id: String,
        title: String,
        price: Number,
    }]
},
    {
        timestamps: true,
    }));

app.post("/api/orders", async (req, res) => {
    if (!req.body.name ||
        !req.body.email ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems
    ) {
        return res.send({ message: "Please input your data" });
    }
    const order = await Order(req.body).save();
    res.send(order);
});




const port = process.env.PORT || 5000
app.listen(port, () => console.log("serve at http://localhost:5000"));