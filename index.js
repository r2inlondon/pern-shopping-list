const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ message: "Root Route Page" });
});

app.get("/user", async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  res.json(user);
});

app.post("/user/new", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const newUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
  res.status(200).send("User Created");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
