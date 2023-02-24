const db = require("../utils/db");

const findProduct = (name) => {
  return db.product.findFirst({
    where: {
      name,
    },
  });
};

module.exports = { findProduct };
