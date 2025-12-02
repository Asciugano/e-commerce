import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export async function getProduct(req, res) {
  const id = req.params.id;

  try {
    if (!id || id === "")
      return res.status(400).json({ error: true, message: "You must give a id" });

    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ error: true, message: "No product found" });

    res.json({ product });
  } catch (e) {
    console.error("Error in getProduct, ", e);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}

export async function getProducts(req, res) {
  try {
    const products = await Product.aggregate([
      { $sample: { size: 25 } }
    ]);

    if (!products || products.length === 0)
      return res.status(500).json({ error: true, message: "Something went wrong. Please try later" });

    res.json({ products })
  } catch (e) {
    console.error("Error in getProducts, ", e);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}

export async function createProduct(req, res) {
  const { name, price, photos } = req.body;
  const user = req.user;
  try {
    if (!name || !price)
      return res.status(400).json({ error: true, message: "You must specify at least the name and the price for this product" });

    if (price <= 0)
      return res.status(400).json({ error: true, message: "Invalid price" });

    const newProduct = new Product({
      name,
      price,
      photos: photos ?? [],
      seller: user._id,
    });

    if (!newProduct)
      return res.status(400).json({ error: true, message: "Invalid data" });

    await newProduct.save();

    return res.status(201).json({ newProduct });
  } catch (e) {
    console.error("Error in createProduct, ", e);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}

export async function updateProduct(req, res) {
  const user = req.user;
  const { productID, name, price, photos } = req.body;

  try {
    if (!name && !price && !photos)
      return res.status(400).json({ error: true, message: "You must change somethings" });

    if (price < 0)
      return res.status(400).json({ error: true, message: "You must specify a real price" });

    if (!productID || productID === "")
      return res.status(400).json({ error: true, message: "You must specify what is the product to update" });

    const product = await Product.findById(productID);
    if (!product)
      return res.status(404).json({ error: true, message: "No product found" });

    if (user._id.toString() !== product.seller.toString())
      return res.status(401).json({ error: true, message: "You catn't update others products" });

    if (name && product.name !== name) product.name = name;
    if (photos) product.photos = photos;
    if (price && product.price !== price) product.price = price;

    await product.save();

    res.json({ product });
  } catch (e) {
    console.error("Error in updateProduct, ", e);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}

export async function deleteProduct(req, res) {
  const user = req.user;
  const { productID } = req.body;

  try {
    if (!productID || productID === "")
      return res.status(400).json({ error: true, message: "You must specify what is the product to delete" });

    const product = await Product.findById(productID);
    if (!product)
      return res.status(404).json({ error: true, message: "No product found" });

    if (user._id.toString() !== product.seller.toString())
      return res.status(401).json({ error: true, message: "You catn't delete others products" });

    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product Deleted" });
  } catch (e) {
    console.error("Error in deleteProduct, ", e);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}

export function getWatchlist(req, res) {
  const user = req.user;

  try {
    res.json({ watchList: user.watchList });
  } catch (e) {
    console.error("Error in getWatchlist, ", e);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}

export async function addToWatchlist(req, res) {
  const { productID } = req.body;
  const user = req.user;
  try {
    if (!productID)
      return res.status(400).json({ error: true, message: "Please specify a product" });

    const product = await Product.findById(productID);
    if (!product)
      return res.status(404).json({ error: true, message: "No products found" });

    if (user.watchList.includes(productID))
      return res.status(400).json({ error: true, message: "Product already in the watchList" });

    user.watchList.push(productID);
    await user.save();

    res.json({ watchList: user.watchList });
  } catch (e) {
    console.error("Error in addToWatchlist, ", e);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}

export async function removeToWatchlist(req, res) {
  const user = req.user;
  const { productID } = req.body;

  try {
    if (!user.watchList.includes(productID))
      return res.status(400).json({ error: true, message: "Invalid product" });

    user.watchList.pop(productID);
    await user.save();

    res.json({ watchList: user.watchList });
  } catch (e) {
    console.error("Error in removeToWatchlist, ", e);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}
