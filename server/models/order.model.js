const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    cart: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    totalPrice: {
      type: Schema.Types.Number,
    },
    totalItems: {
      type: Schema.Types.Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentInfo: {
      id: {
        type: Schema.Types.String,
      },
      status: {
        type: Schema.Types.String,
      },
    },
    shippingAddress: {
      type: Schema.Types.Mixed,
      required: true,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
