import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export async function getAllOrders(req, res) {
  const user = req.user;
  try {
    const orders = await Order.find({
      $or: [
        { seller: user._id },
        { buyer: user._id },
      ]
    })
      .populate("product")
      .populate("buyer", "-password")
      .populate("seller", "-password")
      .sort({ createdAt: -1 });

    if (orders.length === 0)
      return res.json({ message: "Nothing here" });

    res.json({ orders });
  } catch (e) {
    console.error("Error in getAllOrders controller, ", e);
    res.status(500).json({ error: true, message: "Server error" });
  }
}

export async function getOrder(req, res) {
  const user = req.user;
  try {
    if (!req.params.id)
      return res.status(400).json({ error: true, message: "You must insert the order id" });

    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ error: true, message: "Unable to foud the order" });

    if (order.seller.toString() !== user._id.toString() || order.buyer.toString() !== user._id.toString())
      return res.status(401).json({ error: true, message: "This isn't your order" });

    res.json({ order });
  } catch (e) {
    console.error("Error in getOrder controller, ", e);
    res.status(500).json({ error: true, message: "Server error" });
  }
}

export async function createOrder(req, res) {
  const user = req.user;
  const { buyerID, sellerID, productID } = req.body;
  try {
    if (buyerID && sellerID)
      return res.status(400).json({ error: true, message: "You can't be the seller and the buyer at the same time" });
    if ((!buyerID || !sellerID) && !productID)
      return res.status(400).json({ error: true, message: "You must specify all fields" });

    const product = await Product.findById(productID);
    if (!product)
      return res.status(404).json({ error: true, message: "Unable to find the product" });

    const other = await User.findById(buyerID || sellerID)
    if (!other)
      return res.status(404).json({ error: true, message: `Unable to find the ${sellerID ? "seller" : "buyer"}` })

    const newOrder = new Order({
      seller: sellerID || user._id,
      buyer: buyerID || user._id,
      product: product._id
    });

    await newOrder.save();

    res.status(201).json({ newOrder });
  } catch (e) {
    console.error("Error in createOrder controller, ", e);
    res.status(500).json({ error: true, message: "Server error" });
  }
}

export async function deleteOrder(req, res) {
  const user = req.user
  const { orderID } = req.body;
  try {
    if (!orderID)
      return res.status(400).json({ error: true, message: "You must specify the id of the order" });

    const order = await Order.findById(orderID);
    if (!order)
      return res.status(404).json({ error: true, message: "Unable to find the order" });

    if (order.seller.toString() !== user._id.toString() || order.buyer.toString() !== user._id.toString())
      return res.status(401).json({ error: true, message: "You can't delete others order" });
  } catch (e) {
    console.error("Error in createOrder controller, ", e);
    res.status(500).json({ error: true, message: "Server error" });
  }
}

export async function updateOrder(req, res) {
  const user = req.user;
  const { orderID, productID, status } = req.body;
  try {
    if (!orderID && (!productID || !status))
      return res.status(400).json({ error: true, message: "You must specify all the fields" });

    const order = await Order.findById(orderID);
    if (!order)
      return res.status(404).json({ error: true, message: "Unable to find the order" });

    if (order.seller.toString() !== user._id.toString() || order.buyer.toString() !== user._id.toString())
      return res.status(401).json({ error: true, message: "You can't change this order" });

    if (productID) {
      const product = await Product.findById(poductID)
      if (!product)
        return res.status(404).json({ error: true, message: "Unable to find the product" });

      order.product = product._id
    }
    if (status)
      order.status = status;

    await order.save();

    res.json({ order });
  } catch (e) {
    console.error("Error in updateOrder controller, ", e);
    res.status(500).json({ error: true, message: "Server error" });
  }
}

export async function updateOrderStatus(req, res) {
  const user = req.user;
  const { newStatus } = req.body;
  try {
    if (!req.params.id)
      return res.status(400).json({ error: true, message: "You must specify the order id" })

    if (!newStatus)
      return res.status(400).json({ error: true, message: "You must specify the new status" });

    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ error: true, message: "Unable to find the order" });

    if (order.buyer.toString() !== user._id.toString() || order.seller.toString() !== user._id.toString())
      return res.status(401).json({ error: true, message: "You can't modify the status of this order" });

    order.status = newStatus
    await order.save()

    res.json({ order });
  } catch (e) {
    console.error("Error in updateOrderStatus controller, ", e);
    res.status(500).json({ error: true, message: "Server error" });
  }
}
