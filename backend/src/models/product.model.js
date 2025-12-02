import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photos: [{
    type: String,
  }],
}, { timestamps: true }
)

const Product = mongoose.model("Product", productSchema);

export default Product;
