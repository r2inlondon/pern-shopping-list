const bcrypt = require("bcrypt");
const db = require("../utils/db");

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

module.exports = { createUser };
