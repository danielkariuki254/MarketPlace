//require express
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

//import body parser
const bodyParser = require("body-parser");
//import cors
const cors = require("cors");
//invoke express
const app = express();

//import route
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const userRoutes = require("./routes/user");

//app middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use(productRoutes);
app.use(cartRoutes);
app.use(userRoutes);
// Middleware to serve static files (including images)
app.use("/uploads", express.static("uploads"));

//declare a port
const PORT = process.env.PORT || 3000;

//listen the application
app.listen(PORT, () => {
  console.log("Server is up and running on port number :", PORT);
});

//create db connection

const DB_URL = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb connection success!");
  })
  .catch((err) => console.log("unsuccess!", err));

////////////////////////////////////////////////////////////////////////////////////////////////////
