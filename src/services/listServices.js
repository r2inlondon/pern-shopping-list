const db = require("../utils/db");

const findAll = (userId) => {
  return db.list.findMany({
    where: {
      userId,
    },
  });
};

const findList = (name) => {
  return db.list.findFirst({
    where: {
      name,
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

const renameList = (id, name) => {
  return db.list.update({
    data: {
      name,
    },
    where: {
      id,
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

module.exports = { findAll, createList, findList, renameList, removeList };
