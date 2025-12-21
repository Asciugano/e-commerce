import type { Product } from "../types/product";

export default function Product({ product }: { product: Product }) {
  return (
    <div>
      {product.photos.length > 0 && (
        <img src={product.photos[0]} alt={product.name} />
      )}
      <h2>{product.name}</h2>
      <p>${product.price}</p>

      {/* TODO: implementare la ricerca per seller */}
    </div>
  );
}
