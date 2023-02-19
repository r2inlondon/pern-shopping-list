const { createUser } = require("../services/userServices");
const db = require("../utils/db");
const checkCreateUSerData = require("../utils/checkUserData");

const getUser = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await db.user.findUnique({
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

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const data = checkCreateUSerData(firstName, lastName, email, password);

  try {
    const result = await createUser(data);
    res.status(201).send(result);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Bad request!");
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.body;

  try {
    await db.user.delete({
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

module.exports = { getUser: getUser, registerUser, deleteUser };
