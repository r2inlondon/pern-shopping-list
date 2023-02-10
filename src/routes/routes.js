const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const user = require("./user/userRoutes");

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

module.exports = { app };
