const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
const config = require("config");

const app = express();
app.use(bodyParser.json());


//Database Config to bring in mongoDB/Mongoose
const db = config.get("mongoURI");

//Connect to Mongo
mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("MongoDB is connected")) //shows in terminal to show we are connected
    .catch(err => console.log(err));

/*mongoose.connect("mongodb://localhost/shopping_cart", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});*/

const Product = mongoose.model("products", new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],

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



const port = process.env.PORT || 5000
app.listen(port, () => console.log("serve at http://localhost:5000"));