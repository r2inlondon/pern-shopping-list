const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const corsOptions = require("../config/corsOptions");
const credentials = require("../middleware/credentials");
const auth = require("./authRoutes");
const shopping = require("./shoppingRoutes");
const lists = require("./listRoutes");
const products = require("./productRoutes");
const verifyJWT = require("../middleware/verifyJWT");

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware for json
app.use(bodyParser.json());

//middleware for cookies
app.use(cookieParser());

app.get("/", (request, response) => {
  response.json({ message: "Root Route Page" });
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes
app.use("/auth", auth);

app.use(verifyJWT);
app.use("/shopping", shopping);
app.use("/lists", lists);
app.use("/products", products);

module.exports = { app };
