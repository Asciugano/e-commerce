import type { Product } from "./product.ts";

export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  watchList: Product[];

  createdAt: Date;
  updatedAt: Date;
}
