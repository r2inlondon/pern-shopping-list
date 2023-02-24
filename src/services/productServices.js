const db = require("../utils/db");

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
