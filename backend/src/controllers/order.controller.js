export async function getAllOrders(req, res) {
  res.json({ message: "get all order" });
}

export async function getOrder(req, res) {
  res.json({ message: "get order" });
}

export async function createOrder(req, res) {
  res.json({ message: "create order" });
}

export async function deleteOrder(req, res) {
  res.json({ message: "delete order" });
}

export async function updateOrder(req, res) {
  res.json({ message: "update order" });
}
