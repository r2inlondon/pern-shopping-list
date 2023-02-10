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

module.exports = { getAllProductsFromList };
