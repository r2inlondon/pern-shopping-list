const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  createUser,
  findUserByEmail,
  findUserById,
} = require("../services/userServices");
const db = require("../utils/db");
const checkCreateUSerData = require("../utils/checkUserData");
const { generateTokens } = require("../utils/jwt");
const {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
} = require("../services/authServices");
const { hashToken } = require("../utils/hashToken");

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

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: existingUser.id,
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400);
      throw new Error("Missing refresh token.");
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(err);
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

module.exports = { login, registerUser, refreshToken, deleteUser };
