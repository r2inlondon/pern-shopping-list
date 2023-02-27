const capitalizedWord = require("../utils/capitalizedWord");
const { findAll, createList, removeList } = require("../services/listServices");

const getLists = async (req, res, next) => {
  const userId = req.userId;
  try {
    const lists = await findAll(userId);
    res.json(lists);
  } catch (err) {
    next(err);
  }
};

const newList = async (req, res, next) => {
  const { name } = req.body;
  const userId = req.userId;

  const listName = capitalizedWord(name);

  try {
    const newList = await createList(userId, listName);

    res.json(newList);
  } catch (err) {
    next(err);
  }
};

const deleteList = async (req, res, next) => {
  const { id } = req.body;

  try {
    const deletedList = await removeList(id);

    res.json(deletedList);
  } catch (err) {
    next(err);
  }
};

module.exports = { getLists, newList, deleteList };
