import prisma from "../script";

async function main() {
  await prisma.shopping.deleteMany({});
  await prisma.list.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.product.deleteMany({});

  const userOne = await prisma.user.create({
    data: {
      firstName: "Arturo",
      lastName: "Quiroz",
      email: "r2inlondon@gmail.com",
      password: "letmein1",
    },
  });

  const productOne = await prisma.product.create({
    data: { name: "shampoo" },
  });

  const productTwo = await prisma.product.create({
    data: { name: "Milk" },
  });

  const listOne = await prisma.list.create({
    data: {
      name: "Morrisons",
      user: {
        connect: { id: userOne.id },
      },
    },
  });

  const shoppingOne = await prisma.shopping.create({
    data: {
      user: {
        connect: { id: userOne.id },
      },
      list: {
        connect: { id: listOne.id },
      },
      product: {
        connect: { id: productOne.id },
      },
    },
  });

  const userTwo = await prisma.user.upsert({
    where: { email: "fed@itlab.com" },
    update: {},
    create: {
      firstName: "Federico",
      lastName: "Pantalone",
      email: "fed@itlab.com",
      password: "Pompino",
    },
  });

  const listTwo = await prisma.list.create({
    data: {
      name: "Mercato",
      user: {
        connect: { id: userOne.id },
      },
    },
  });

  const shoppingTwo = await prisma.shopping.create({
    data: {
      user: {
        connect: { id: userTwo.id },
      },
      list: {
        connect: { id: listTwo.id },
      },
      product: {
        connect: { id: productOne.id },
      },
    },
  });

  const shoppingThree = await prisma.shopping.create({
    data: {
      user: {
        connect: { id: userTwo.id },
      },
      list: {
        connect: { id: listTwo.id },
      },
      product: {
        connect: { id: productTwo.id },
      },
    },
  });

  console.log("DB seed has been completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
