const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { findUser, createUser } = require("./api/user/userRoutes");

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ message: "Root Route Page" });
});

// Routes
app.get("/user", findUser);
app.post("/user/new", createUser);

module.exports = { app };
