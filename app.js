const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const corsOptions = require("./src/config/corsOptions");
const credentials = require("./src/middleware/credentials");
const auth = require("./src/routes/authRoutes");
const shopping = require("./src/routes/shoppingRoutes");
const lists = require("./src/routes/listRoutes");
const products = require("./src/routes/productRoutes");
const verifyJWT = require("./src/middleware/verifyJWT");

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
