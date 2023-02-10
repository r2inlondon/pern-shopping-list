const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

module.exports = { getLists };
