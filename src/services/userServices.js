const bcrypt = require("bcrypt");
const db = require("../utils/db");

const findUserByEmail = (email) => {
  return db.user.findUnique({
    where: {
      email,
    },
  });
};

const findUserById = (id) => {
  return db.user.findUnique({
    where: {
      id,
    },
  });
};

const findUserByRefreshToken = (refreshToken) => {
  return db.user.findFirst({
    where: {
      refreshToken,
    },
  });
};

const createUser = ({ firstName, lastName, email, password }) => {
  const encryptedPass = bcrypt.hashSync(password, 12);

  return db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: encryptedPass,
    },
  });
};

const refreshTokenToUser = (id, refreshToken) => {
  return db.user.update({
    where: {
      id,
    },
    data: {
      refreshToken,
    },
  });
};

const removeRefreshToken = (id) => {
  return db.user.update({
    where: {
      id,
    },
    data: {
      refreshToken: "",
    },
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  refreshTokenToUser,
  findUserByRefreshToken,
  removeRefreshToken,
};
