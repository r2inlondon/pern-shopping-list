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

module.exports = { createUser, findUserByEmail, findUserById };
