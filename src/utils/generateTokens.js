const jwt = require("jsonwebtoken");

function generateAccessToken(id) {
  return jwt.sign({ userId: id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
}

function generateRefreshToken(id) {
  return jwt.sign(
    {
      userId: id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "1d",
    }
  );
}

function generateTokens(id) {
  const accessToken = generateAccessToken(id);
  const refreshToken = generateRefreshToken(id);

  return {
    accessToken,
    refreshToken,
  };
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};
