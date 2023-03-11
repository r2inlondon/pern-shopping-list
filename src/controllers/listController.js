const capitalizedWord = require("../utils/capitalizedWord");
const {
  findAll,
  findList,
  createList,
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
  const { name } = req.body;
  const userId = req.userId;

  try {
    const whiteSpace = new RegExp(/\s/);

    if (!name || whiteSpace.test(name)) {
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
