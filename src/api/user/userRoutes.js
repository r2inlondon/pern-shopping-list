const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findUser = async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  res.json(user);
};

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const newUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
  res.status(201).send("User Created");
};

module.exports = { findUser, createUser };
