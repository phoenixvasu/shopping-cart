import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Get current user's cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.userId }).populate(
      "items.product"
    );
    if (!cart) cart = await Cart.create({ user: req.user.userId, items: [] });
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add or update an item in the cart
export const addOrUpdateItem = async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity || quantity < 1) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product or quantity" });
  }
  try {
    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    if (product.stock === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Product is out of stock" });
    }
    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) cart = await Cart.create({ user: req.user.userId, items: [] });
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    let newQty = quantity;
    if (itemIndex > -1) {
      const currentQty = cart.items[itemIndex].quantity;
      if (currentQty >= product.stock) {
        return res.status(400).json({
          success: false,
          message: `You already have the maximum available stock (${product.stock}) for this product in your cart.`,
        });
      }
      newQty = currentQty + quantity;
      if (newQty > product.stock) newQty = product.stock;
      cart.items[itemIndex].quantity = newQty;
    } else {
      if (quantity > product.stock) newQty = product.stock;
      cart.items.push({ product: productId, quantity: newQty });
    }
    await cart.save();
    await cart.populate("items.product");
    let message = undefined;
    if (itemIndex > -1 && newQty < cart.items[itemIndex].quantity + quantity) {
      message = `Only ${product.stock} in stock. Quantity set to maximum available.`;
    }
    res.json({ success: true, cart, message });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove an item from the cart
export const removeItem = async (req, res) => {
  const { productId } = req.body;
  if (!productId)
    return res
      .status(400)
      .json({ success: false, message: "Product required" });
  try {
    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();
    await cart.populate("items.product");
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Clear the cart
export const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    cart.items = [];
    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
