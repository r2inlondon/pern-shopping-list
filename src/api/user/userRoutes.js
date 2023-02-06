const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const checkCreateUSerData = require("../../utils/checkUserData");

const findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    res.json(user);
  } catch (err) {
    // console.error(err.message);
    res.status(404).send("User not found!");
  }
};

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const data = checkCreateUSerData(firstName, lastName, email, password);

  try {
    const newUser = await prisma.user.create({
      data,
    });
    res.status(201).send("User Created");
  } catch (err) {
    // console.error(err.message);
    res.status(400).send("Bad request!");
  }
};

module.exports = { findUser, createUser };
