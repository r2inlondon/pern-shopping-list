const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const capitalizedWord = require("../utils/capitalizedWord");

const createProduct = async (req, res) => {
  const { name } = req.body;

  const newName = capitalizedWord(name);

  try {
    const newProduct = await prisma.product.create({
      data: {
        name: newName,
      },
    });

    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).send("Query Error!");
  }
};

const getAllProducts = async (req, res) => {
  try {
    const getAllProducts = await prisma.product.findMany();
    res.json(getAllProducts);
  } catch (err) {
    console.log(err);
    res.status(400).send("Query Error!");
  }
};

const startsWith = async (req, res) => {
  const { name } = req.body;

  const newName = capitalizedWord(name);

  try {
    const productResults = await prisma.product.findMany({
      where: {
        name: {
          startsWith: newName,
        },
      },
    });

    res.json(productResults);
  } catch (err) {
    console.log(err);
    res.status(400).send("Query Error!");
  }
};

const deleteProduct = async (req, res) => {
  const { name } = req.body;

  try {
    const deleteResult = await prisma.product.delete({
      where: {
        name,
      },
    });

    res.json(deleteResult);
  } catch (err) {
    console.log(err);
    res.status(400).send("Query Error!");
  }
};

const newProductInList = async (req, res, next) => {
  const { productName, listId } = req.body;

  const newProductName = capitalizedWord(productName);

  try {
    const newProductInList = await prisma.product.create({
      data: {
        name: newProductName,
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

    res.json(newProductInList);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  startsWith,
  deleteProduct,
  newProductInList,
};
