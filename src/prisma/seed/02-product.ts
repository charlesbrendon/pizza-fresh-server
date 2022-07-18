import { Prisma, PrismaClient } from '@prisma/client';

export const produts: Prisma.ProductCreateInput[] = [
  {
    name: 'Pizza de Atum',
    price: 40.55,
    description: 'Pizza de Atum, molho, mussarela e cebola',
    image: 'https://i.imgur.com/2WTQHql.png',
  },
  {
    name: 'Pizza de Frango',
    price: 40.55,
    description: 'Pizza de Frango, molho, mussarela e cebola',
    image: 'https://i.imgur.com/2WTQHql.png',
  },
  {
    name: 'Pizza de Carne',
    price: 40.55,
    description: 'Pizza de Carne, molho, mussarela e cebola',
    image: 'https://i.imgur.com/2WTQHql.png',
  },
];

export const product = async (prisma: PrismaClient) => {
  for (const obj of Object.values(produts)) {
    await prisma.product.upsert({
      where: { name: obj.name },
      update: {},
      create: {
        ...obj,
      },
    });
  }
};
