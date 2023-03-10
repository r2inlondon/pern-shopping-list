const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const user = require("./userRoutes");
const shopping = require("./shoppingRoutes");
const lists = require("./listRoutes");
const products = require("./productRoutes");

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.json({ message: "Root Route Page" });
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes
app.use("/user", user);
app.use("/shopping", shopping);
app.use("/lists", lists);
app.use("/products", products);

module.exports = { app };
