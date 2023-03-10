const db = require("../utils/db");

const createProduct = (name) => {
  return db.product.create({
    data: {
      name,
    },
  });
};

const findProduct = (name) => {
  return db.product.findFirst({
    where: {
      name,
    },
  });
};

const gellAll = () => {
  return db.product.findMany();
};

const findByName = (name) => {
  return db.product.findMany({
    where: {
      name: {
        startsWith: newName,
      },
    },
  });
};

module.exports = { gellAll, findProduct };
