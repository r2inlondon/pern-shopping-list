const { v4: uuidv4 } = require("uuid");
const { createUser, findUserByEmail } = require("../services/userServices");
const db = require("../utils/db");
const checkCreateUSerData = require("../utils/checkUserData");
const { generateTokens } = require("../utils/jwt");
const { addRefreshTokenToWhitelist } = require("../services/authServices");

const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400);
      throw new Error("You must provide an email and a password.");
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400);
      throw new Error("Email already in use.");
    }

    const data = checkCreateUSerData(firstName, lastName, email, password);
    const user = await createUser(data);
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Bad request!");
  }
};

const login = async (req, res) => {
  const { email } = req.body;

  try {
    const user = (await findUserByEmail(email)) || "User not found!";
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(404).send("Bad request");
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

module.exports = { login, registerUser, deleteUser };
