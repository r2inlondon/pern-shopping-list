const capitalizedWord = require("../utils/capitalizedWord");
const { findProductInCatalog } = require("../services/productServices");
const {
  findProductOnList,
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
  let newProductOnList;
  let productAlreadyOnList;

  const productName = capitalizedWord(name);

  try {
    const ProductInCatalog = await findProductInCatalog(productName);

    if (ProductInCatalog) {
      productAlreadyOnList = await findProductOnList(
        listId,
        ProductInCatalog.id
      );
    }

    if (productAlreadyOnList) {
      res.status(409);
      throw new Error("Duplicated product in list");
    }

    if (ProductInCatalog) {
      newProductOnList = await addExistingProductToList(
        listId,
        ProductInCatalog.id
      );
    } else {
      newProductOnList = await createNewProductAndInsert(productName, listId);
    }

    res.json(newProductOnList);
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
