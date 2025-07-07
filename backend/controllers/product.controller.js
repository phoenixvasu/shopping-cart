import Product from "../models/product.model.js";
import mongoose from "mongoose";
export const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    const filter = {};
    if (category && category !== "All") filter.category = category;
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
    }
    const products = await Product.find(filter);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (
    !product.name ||
    !product.price ||
    !product.image ||
    product.category === undefined ||
    product.stock === undefined
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide all fields (name, price, image, category, stock)",
    });
  }

  const newProduct = new Product({
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category || "General",
    stock: product.stock,
    reviews: [],
  });

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  if (
    !product.name ||
    !product.price ||
    !product.image ||
    product.category === undefined ||
    product.stock === undefined
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide all fields (name, price, image, category, stock)",
    });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category || "General",
        stock: product.stock,
      },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("error in deleting product", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Query required" });
    }
    const regex = new RegExp(q, "i");
    const products = await Product.find({
      $or: [{ name: regex }, { category: regex }],
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const addReview = async (req, res) => {
  try {
    const { id } = req.params; // product id
    const { rating, comment } = req.body;
    const userId = req.user.userId;
    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ success: false, message: "Rating must be 1-5" });
    }
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    // Check if user already reviewed
    const existing = product.reviews.find((r) => r.user.toString() === userId);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }
    product.reviews.push({ user: userId, rating, comment });
    await product.save();
    res.status(201).json({
      success: true,
      reviews: product.reviews,
      averageRating: calcAvg(product.reviews),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params; // product id
    const { rating, comment } = req.body;
    const userId = req.user.userId;
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    const review = product.reviews.find((r) => r.user.toString() === userId);
    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    if (rating) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    await product.save();
    res.json({
      success: true,
      reviews: product.reviews,
      averageRating: calcAvg(product.reviews),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params; // product id
    const userId = req.user.userId;
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    const initialLen = product.reviews.length;
    product.reviews = product.reviews.filter(
      (r) => r.user.toString() !== userId
    );
    if (product.reviews.length === initialLen) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    await product.save();
    res.json({
      success: true,
      reviews: product.reviews,
      averageRating: calcAvg(product.reviews),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

function calcAvg(reviews) {
  if (!reviews.length) return 0;
  return (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(2);
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
