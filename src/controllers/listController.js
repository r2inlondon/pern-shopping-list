const capitalizedWord = require("../utils/capitalizedWord");
const {
  findAll,
  findList,
  createList,
  renameList,
  removeList,
} = require("../services/listServices");

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
  let { name } = req.body;
  const userId = req.userId;
  name = name.trim();

  try {
    if (name.length === 0) {
      res.status(400);
      throw new Error("Bad entry on list name");
    }

    const listName = capitalizedWord(name);

    const allUserLists = await findAll(userId);

    const existingList = allUserLists.filter((list) => list.name === listName);

    if (existingList.length > 0) {
      res.status(409);
      throw new Error("Already registered list name");
    }

    const newList = await createList(userId, listName);

    res.json(newList);
  } catch (err) {
    next(err);
  }
};

const updateList = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const trimmedName = name.trim();
  const listName = capitalizedWord(trimmedName);

  try {
    const updatedList = await renameList(id, listName);

    res.json(updatedList);
  } catch (err) {
    next(err);
  }
};

const deleteList = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedList = await removeList(id);

    res.json(deletedList);
  } catch (err) {
    next(err);
  }
};

module.exports = { getLists, newList, updateList, deleteList };
