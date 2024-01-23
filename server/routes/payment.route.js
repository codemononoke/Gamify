const {
  processPayment,
  sendStripeApi,
} = require("../controllers/payment.controller");
const { getAccessToRoute } = require("../middleware/auth");

const router = require("express").Router();

router.post("/process", getAccessToRoute, processPayment);
router.get("/stripeapi", sendStripeApi);

module.exports = router;
