const { Schema, model } = require("mongoose");

const order = new Schema(
  {
    targetPrice: {
      type: Number,
      required: true,
    },
    takeProfit: Number,
    stopLoss: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", order);

module.exports = Order;
