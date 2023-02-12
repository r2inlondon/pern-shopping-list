const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProductsFromList = async (req, res) => {
  const { listId } = req.body;

  try {
    const shoppingContent = await prisma.shopping.findMany({
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
    const listNewItem = await prisma.shopping.create({
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

module.exports = {
  getAllProductsFromList,
  newShoppingItem,
};
