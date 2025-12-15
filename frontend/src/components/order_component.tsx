import type { Order } from "../types/order";

export default function Order({ order }: { order: Order }) {
  return (
    <div>
      <h1>Order component</h1>
      <p>{order.id}</p>
    </div>
  );
}
