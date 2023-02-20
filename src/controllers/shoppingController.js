const db = require("../utils/db");

const getAllProductsFromList = async (req, res) => {
  const { listId } = req.body;

  try {
    const shoppingContent = await db.shopping.findMany({
      where: {
        listId,
      },
      include: {
        product: true,
      },
    });
    res.json(shoppingContent);
  } catch (err) {
    console.error(err);
    res.status(404).send("Not found!");
  }
};

const newShoppingItem = async (req, res) => {
  const { listId, productId } = req.body;

  try {
    const listNewItem = await db.shopping.create({
      data: {
        listId,
        productId,
      },
    });

    res.json(listNewItem);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request!");
  }
};

const updateShoppingItem = async (req, res) => {
  const { id, completed, quantity } = req.body;

  try {
    const updatedShopping = await db.shopping.update({
      where: {
        id,
      },
      data: {
        completed,
        quantity,
      },
    });

    res.json(updatedShopping);
  } catch (error) {
    console.log(error);
    res.status(400).send("Bad Request!");
  }
};

const deleteShoppingItem = async (req, res) => {
  const { shoppingId } = req.body;

  try {
    const listDeleteItem = await db.shopping.delete({
      where: {
        id: shoppingId,
      },
    });

    res.json(listDeleteItem);
  } catch (err) {
    console.error(err);
    res.status(400).send("Bad Request!");
  }
};

module.exports = {
  getAllProductsFromList,
  newShoppingItem,
  deleteShoppingItem,
  updateShoppingItem,
};
