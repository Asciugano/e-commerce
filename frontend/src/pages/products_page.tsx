import { useEffect, useState } from "react";
import Product from "../components/product_component";
import { AxiosError } from "axios";
import { api } from "../lib/axios";
import { Loader2 } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get("/products/")
      .then((res) => res.data)
      .then((data) => setProducts(data.products))
      .catch((e) => {
        console.error(e);
        const err = e as AxiosError<{ message?: string }>;
        if (err.response?.data.message)
          setError(err.response.data.message);
        else if (typeof err.response?.data === "string")
          setError(err.response?.data);
        else
          setError("Ops... Something went wrong");
      })
      .finally(() => setLoading(false));
  }, []);


  if (loading || error)
    return (
      <div className="flex items-center justify-center w-full bg-neutral-900 rounded-2xl shadow-lg px-4 py-2">
        {loading && (
          <Loader2 size={50} className="text-emerald-400 animate-spin" />
        )}
        {error && (
          <h2 className="text-lg text-red-600">{error}</h2>
        )}
      </div>
    );

  return (
    <div>
      <div className="flex flex-col gap-3 flex-1 bg-neutral-900 rounded-2xl shadow-lg px-6 py-4">
        {products && products.length > 0 && (
          <div className="w-full">
            {products.map(product => (
              <Product product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
