import type { Product } from "../types/product";

export default function Product({ product }: { product: Product }) {
  return (
    <div>
      <h1>Product component</h1>
      <p>{product.id}</p>
    </div>
  );
}
