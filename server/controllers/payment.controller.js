const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require("express-async-handler");

const processPayment = asyncHandler(async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      description: "for gamify project",
      shipping: {
        name: "Random Singh",
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
      metadata: { integration_check: "accept_a_payment" },
    });

    return res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
      msg: "Payment process successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Failed to process payment",
      error: error,
    });
  }
});

const sendStripeApi = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY,
      msg: "Send stripe api successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Failed to send stripe api",
      error: error,
    });
  }
});

module.exports = { processPayment, sendStripeApi };
