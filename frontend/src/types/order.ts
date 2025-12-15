import type { User } from "./user.ts";
import type { Product } from "./product.ts";

const OrderStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
  CONCELLED: "concelled",
} as const

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export interface Order {
  id: string;
  buyer: User;
  seller: User;
  product: Product;
  status: OrderStatus;
}
