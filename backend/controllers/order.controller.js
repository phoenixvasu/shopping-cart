import Order from "../models/order.model.js";
import Stripe from "stripe";
import Product from "../models/product.model.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const createOrder = async (req, res) => {
  try {
    const { items, address, paymentMethodId, total } = req.body;
    // Check stock for all items
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(400)
          .json({ success: false, message: `Product not found: ${item.name}` });
      }
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({
            success: false,
            message: `Not enough stock for ${product.name}. Only ${product.stock} left.`,
          });
      }
    }
    // Create Stripe payment intent (test mode)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // in cents
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
    });
    // Decrement stock for each product
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }
    const order = new Order({
      user: req.user.userId,
      items,
      address,
      payment: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100,
      },
      total,
      status: "placed",
    });
    await order.save();
    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
