const jwt = require("jsonwebtoken");
const { findUserByRefreshToken } = require("../services/userServices");
const { generateAccessToken } = require("../utils/generateTokens");

const handleRefreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  try {
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const foundUser = await findUserByRefreshToken(refreshToken);

    if (!foundUser) return res.sendStatus(403); // Forbidden

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err || foundUser.id !== decoded.userId) return res.sendStatus(403);
      const accessToken = generateAccessToken(decoded.userId);

      res.json({ accessToken });
    });
  } catch (err) {
    next(err);
  }
};

module.exports = handleRefreshToken;
