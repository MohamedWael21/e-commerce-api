import prisma from "../config/prisma";

export async function getCartItems(userId: number) {
  const data = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      cart: {
        select: {
          CartItem: {
            select: {
              quantity: true,
              product: true,
            },
          },
        },
      },
    },
  });

  const cartItems = data?.cart?.CartItem || [];

  return cartItems;
}

async function getCartId(userId: number) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      cart: true,
    },
  });

  let cartId = user?.cart?.id;

  if (!cartId) {
    const cart = await prisma.cart.create({
      data: {
        userId,
      },
    });
    cartId = cart.id;
  }
  return cartId;
}

export async function updateCart(userId: number, { productId, quantity }: CartItemsPayload) {
  const cartId = await getCartId(userId);

  const cartItem = await prisma.cartItem.findFirst({
    where: {
      cartId,
      productId,
    },
  });

  // remove
  if (cartItem && quantity === 0) {
    await prisma.cartItem.delete({
      where: {
        id: cartItem.id,
      },
    });
    return;
  }

  // update
  if (cartItem) {
    await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity,
      },
    });
    return;
  }

  // create
  await prisma.cartItem.create({
    data: {
      quantity,
      productId,
      cartId,
    },
  });
}

export async function deleteCartItem(userId: number, productId: number) {
  const cartId = await getCartId(userId);

  await prisma.cartItem.deleteMany({
    where: {
      cartId,
      productId,
    },
  });
}

export async function isProductExistInCart(userId: number, productId: number) {
  const cartId = await getCartId(userId);

  const count = await prisma.cartItem.count({
    where: {
      cartId,
      productId,
    },
  });

  return count > 0;
}

export async function deleteCart(userId: number) {
  const cartId = await getCartId(userId);

  await prisma.cartItem.deleteMany({
    where: {
      cartId,
    },
  });

  await prisma.cart.delete({
    where: {
      id: cartId,
    },
  });
}
