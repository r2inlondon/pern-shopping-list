const db = require("../utils/db");
const capitalizedWord = require("../utils/capitalizedWord");

const getLists = async (req, res) => {
  const { userId } = req.payload;

  try {
    const lists = await db.list.findMany({
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
    const newList = await db.list.create({
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

const deleteList = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedList = await db.list.delete({
      where: {
        id,
      },
    });
    res.json(deletedList);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Bad request!");
  }
};

module.exports = { getLists, newList, deleteList };
