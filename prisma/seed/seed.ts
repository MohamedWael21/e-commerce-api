import { createSeedClient, Store } from "@snaplet/seed";
import { getHashedPassword } from "../../src/utils/helpers";
import { faker } from "@faker-js/faker";
const generateUniqueUsername = (store: Store) => {
  let username: string;
  do {
    username = faker.internet.userName();
  } while (store.user.find((user) => user.username === username));

  return username;
};

const main = async () => {
  const hashedPassword = await getHashedPassword("12345678");
  const seed = await createSeedClient({
    models: {
      user: {
        data: {
          username: (ctx) => generateUniqueUsername(ctx.$store),
          password: hashedPassword,
        },
      },
      product: {
        data: {
          name: faker.commerce.productName,
          price: () => Number(faker.commerce.price()),
          description: faker.commerce.productDescription,
          stock: () => faker.number.int({ min: 1, max: 2000 }),
        },
      },
    },
  });

  // Truncate all tables in the database
  await seed.$resetDatabase();

  await seed.user((x) => x(100));

  await seed.product((x) => x(100));

  await seed.cart((x) => x(100));

  await seed.cartItem((x) => x(100));

  await seed.order((x) => x(100));

  await seed.orderItem((x) => x(100));

  process.exit();
};

main();
