const bcrypt = require("bcrypt");
const {
  createUser,
  findUserByEmail,
  findUserByRefreshToken,
  refreshTokenToUser,
  removeRefreshToken,
} = require("../services/userServices");
const db = require("../utils/db");
const checkCreateUSerData = require("../utils/checkUserData");
const { generateTokens } = require("../utils/generateTokens");

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
    const { accessToken, refreshToken } = generateTokens(user.id);

    await refreshTokenToUser(user.id, refreshToken);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400);
      throw new Error("You must provide an email and a password.");
    }

    const existingUser = await findUserByEmail(email.toLocaleLowerCase());

    if (!existingUser) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const { accessToken, refreshToken } = generateTokens(existingUser.id);

    await refreshTokenToUser(existingUser.id, refreshToken);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  const cookies = req.cookies;
  try {
    // on client delete access token too

    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const foundUser = await findUserByRefreshToken(refreshToken);

    if (!foundUser) {
      // delete the cookie from header response
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    await removeRefreshToken(foundUser.id);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure: true - only on prod
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    await db.user.delete({
      where: {
        email,
      },
    });
    res.status(201).send("User Deleted");
  } catch (err) {
    next(err);
  }
};

module.exports = { login, registerUser, deleteUser, logout };
