require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
// var cookieParser = require('cookie-parser');

//config database
const connect = require("./db/database");
connect();

//config default-data
// const defaultData = require("./defaultData");
// defaultData();

//config cors
var corsOptions = {
    origin: 'http://localhost:3000',
  }
app.use(cors(corsOptions));

//config middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//config cookie-parser
// app.use(cookieParser(""));

//config routing
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
const cartRoutes = require("./routes/cartRoutes");
app.use("/api/carts", cartRoutes);

app.listen(PORT, () => {
    console.log(`server running on port number : ${PORT}`);
});

