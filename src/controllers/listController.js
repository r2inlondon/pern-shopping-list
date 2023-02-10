const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const capitalizedWord = require("../utils/capitalizedWord");

const getLists = async (req, res) => {
  const { userId } = req.body;
  try {
    const lists = await prisma.list.findMany({
      where: {
        userId,
      },
    });

    res.json(lists);
  } catch (err) {
    console.error(err);
    res.status(400).send("Query Error!");
  }
};

const newList = async (req, res) => {
  const { userId, name } = req.body;
  const listName = capitalizedWord(name);

  try {
    const newList = await prisma.list.create({
      data: {
        userId,
        name: listName,
      },
    });
    res.json(newList);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Bad request!");
  }
};

module.exports = { getLists, newList };
