-- AlterTable
CREATE SEQUENCE cart_id_seq;
ALTER TABLE "Cart" ALTER COLUMN "id" SET DEFAULT nextval('cart_id_seq');
ALTER SEQUENCE cart_id_seq OWNED BY "Cart"."id";

-- AlterTable
CREATE SEQUENCE cartitem_id_seq;
ALTER TABLE "CartItem" ALTER COLUMN "id" SET DEFAULT nextval('cartitem_id_seq');
ALTER SEQUENCE cartitem_id_seq OWNED BY "CartItem"."id";

-- AlterTable
CREATE SEQUENCE order_id_seq;
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT nextval('order_id_seq');
ALTER SEQUENCE order_id_seq OWNED BY "Order"."id";

-- AlterTable
CREATE SEQUENCE product_id_seq;
ALTER TABLE "Product" ALTER COLUMN "id" SET DEFAULT nextval('product_id_seq');
ALTER SEQUENCE product_id_seq OWNED BY "Product"."id";

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";

-- AlterTable
CREATE SEQUENCE orderitem_id_seq;
ALTER TABLE "orderItem" ALTER COLUMN "id" SET DEFAULT nextval('orderitem_id_seq');
ALTER SEQUENCE orderitem_id_seq OWNED BY "orderItem"."id";
