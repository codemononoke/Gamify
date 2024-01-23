const router = require("express").Router();
const {
  createOrder,
  getUserOrders,
} = require("../controllers/order.controller");
const { getAccessToRoute } = require("../middleware/auth");

router.post("/createOrder", getAccessToRoute, createOrder);
router.get("/getUserOrders", getAccessToRoute, getUserOrders);

module.exports = router;
