const capitalizedWord = require("../utils/capitalizedWord");
const { findProduct } = require("../services/productServices");
const {
  createNewProductAndInsert,
  addExistingProductToList,
  getAllItems,
  updateItem,
  deleteItem,
} = require("../services/shoppingServices");

const getAllProductsFromList = async (req, res) => {
  const shoppingId = req.params.shoppingId;

  try {
    const shoppingContent = await getAllItems(shoppingId);

    res.json(shoppingContent);
  } catch (err) {
    next(err);
  }
};

const newShoppingItem = async (req, res, next) => {
  const { listId, name } = req.body;

  const productName = capitalizedWord(name);

  let productOnList;

  try {
    const productFound = await findProduct(productName);

    if (productFound) {
      productOnList = await addExistingProductToList(listId, productFound.id);
    } else {
      productOnList = await createNewProductAndInsert(productName, listId);
    }

    res.json(productOnList);
  } catch (err) {
    next(err);
  }
};

const updateShoppingItem = async (req, res, next) => {
  const { id, completed, quantity } = req.body;

  try {
    let updatedShopping = await updateItem(id, completed, quantity);

    res.json(updatedShopping);
  } catch (error) {
    next(err);
  }
};

const deleteShoppingItem = async (req, res, next) => {
  const { shoppingId } = req.body;

  try {
    const listDeleteItem = await deleteItem(shoppingId);

    res.json(listDeleteItem);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProductsFromList,
  newShoppingItem,
  deleteShoppingItem,
  updateShoppingItem,
};
