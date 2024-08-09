import Stripe from "stripe";
import * as cartService from "./cart.service";
import * as orderService from "./order.service";
import * as productService from "./product.service";

type LineItems = Stripe.Checkout.SessionCreateParams.LineItem[];

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function createCheckoutSession(userId: number) {
  const lineItems = await createLineItems(userId);

  const successUrl = process.env.PAYMENT_SUCCESS_URL;
  const cancelUrl = process.env.PAYMENT_CANCELED_URL;

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session;
}

async function createLineItems(userId: number) {
  const cartItems = await cartService.getCartItems(userId);

  const lineItems: LineItems = [];

  for (const { product, quantity } of cartItems) {
    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: product.price * quantity,
      product_data: {
        name: product.name,
      },
    });
    lineItems.push({
      price: price.id,
      quantity,
    });
  }

  return lineItems;
}

export async function createOrder(userId: number) {
  const cartItems = await cartService.getCartItems(userId);

  await cartService.deleteCart(userId);

  const totalPrice = cartItems.reduce((curr, cartItem) => cartItem.quantity * cartItem.product.price + curr, 0);

  const order = await orderService.createOrder({
    totalPrice,
    user: {
      connect: {
        id: userId,
      },
    },
    date: new Date().toISOString(),
  });

  for (const cartItem of cartItems) {
    await orderService.createOrderItem({
      quantity: cartItem.quantity,
      productId: cartItem.product.id,
      orderId: order.id,
    });
    const newStock = cartItem.product.stock - cartItem.quantity;
    await productService.updateProduct(cartItem.product.id, {
      stock: newStock,
    });
  }
}
