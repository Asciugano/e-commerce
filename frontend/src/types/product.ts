import type { User } from "./user.ts";

export interface Product {
  id: string;
  seller: User;
  name: string;
  price: number;
  photos: string;

  createdAt: Date;
  updatedAt: Date;
}
