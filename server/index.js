require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// Authentication LOGIN & REGISTER
app.use("/api/v1/auth", require("./routes/auth"));
// Products, GET
app.use("/api/v1/products", require("./routes/products"));
// Cart, POST GET UPDATE DELETE
app.use("/api/v1/cart", require("./routes/cart"));
// Subscriber POST
app.use("/api/v1/subscriber", require("./routes/subscribers"));

const port = process.env.PORT || 5007;
app.listen(port, () => {
  console.log(`Server listening on Port ${port}`);
});
