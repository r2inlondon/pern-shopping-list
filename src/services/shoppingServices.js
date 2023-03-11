const db = require("../utils/db");

const getAllItems = (listId) => {
  return db.shopping.findMany({
    where: {
      listId,
    },
    include: {
      product: true,
    },
  });
};

const findProductOnList = (listId, productId) => {
  return db.shopping.findFirst({
    where: {
      listId,
      productId,
    },
  });
};

const createNewProductAndInsert = (productName, listId) => {
  return db.product.create({
    data: {
      name: productName,
      lists: {
        create: [
          {
            list: {
              connect: {
                id: listId,
              },
            },
          },
        ],
      },
    },
  });
};

const addExistingProductToList = (listId, productId) => {
  return db.shopping.create({
    data: {
      listId,
      productId,
    },
  });
};

const updateItem = (id, completed, quantity) => {
  return db.shopping.update({
    where: {
      id,
    },
    data: {
      completed,
      quantity,
    },
  });
};

const deleteItem = (id) => {
  return db.shopping.delete({
    where: {
      id,
    },
  });
};

const deleteMultipleItems = (listId) => {
  return db.shopping.deleteMany({
    where: {
      listId,
      completed: true,
    },
  });
};

module.exports = {
  findProductOnList,
  createNewProductAndInsert,
  addExistingProductToList,
  getAllItems,
  updateItem,
  deleteItem,
  deleteMultipleItems,
};
