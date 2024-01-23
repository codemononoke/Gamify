const Order = require("../models/order.model");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.create({
      cart: req.body.cart,
      totalPrice: req.body.totalPrice,
      totalItems: req.body.totalItems,
      user: req.user.id,
      paymentInfo: req.body.paymentInfo,
      shippingAddress: req.body.shippingAddress,
      paidAt: Date.now(),
    });

    return res.status(200).json({
      success: true,
      order,
      msg: "Order created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Failed to create order",
      error: error,
    });
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({
      user: userId,
    });

    return res.status(200).json({
      success: true,
      orders,
      msg: "Get user orders successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Failed to get user orders",
      error: error,
    });
  }
});

module.exports = { createOrder, getUserOrders };
