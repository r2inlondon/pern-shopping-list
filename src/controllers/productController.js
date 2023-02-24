const capitalizedWord = require("../utils/capitalizedWord");
const { gellAll } = require("../services/productServices");

const getAllProducts = async (req, res, next) => {
  try {
    const getAllProducts = await gellAll();
    res.json(getAllProducts);
  } catch (err) {
    next(err);
  }
};

// const createProduct = async (req, res) => {
//   const { name } = req.body;

//   const newName = capitalizedWord(name);

//   try {
//     const newProduct = await prisma.product.create({
//       data: {
//         name: newName,
//       },
//     });

//     res.json(newProduct);
//   } catch (err) {
//     console.log(err);
//     res.status(400).send("Query Error!");
//   }
// };

// const deleteProduct = async (req, res) => {
//   const { name } = req.body;

//   try {
//     const deleteResult = await prisma.product.delete({
//       where: {
//         name,
//       },
//     });

//     res.json(deleteResult);
//   } catch (err) {
//     console.log(err);
//     res.status(400).send("Query Error!");
//   }
// };

module.exports = {
  getAllProducts,
};
