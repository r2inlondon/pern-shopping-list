const db = require("../utils/db");

const findAll = (userId) => {
  return db.list.findMany({
    where: {
      userId,
    },
  });
};

const createList = (userId, name) => {
  return db.list.create({
    data: {
      userId,
      name,
    },
  });
};

const removeList = (id) => {
  return db.list.delete({
    where: {
      id,
    },
  });
};

module.exports = { findAll, createList, removeList };
