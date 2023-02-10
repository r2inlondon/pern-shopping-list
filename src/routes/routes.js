const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const user = require("./userRoutes");
const shopping = require("./shoppingRoutes");
const lists = require("./listRoutes");

// Type Script
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
app.use("/list", lists);

module.exports = { app };
