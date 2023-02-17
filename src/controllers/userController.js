const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const checkCreateUSerData = require("../utils/checkUserData");

const getUser = async (req, res) => {
  // console.log(req.params);
  const { email } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(404).send("User not found!");
  }
};

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const data = checkCreateUSerData(firstName, lastName, email, password);

  try {
    await prisma.user.create({
      data,
    });
    res.status(201).send("User Created");
  } catch (err) {
    // console.error(err.message);
    res.status(400).send("Bad request!");
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.body;

  try {
    await prisma.user.delete({
      where: {
        email,
      },
    });
    res.status(201).send("User Deleted");
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Bad request!");
  }
};

module.exports = { getUser: getUser, createUser, deleteUser };
