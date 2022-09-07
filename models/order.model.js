const { Schema, model } = require("mongoose");

const order = new Schema(
  {
    symbol : {
      type : String,
      required : true,
    },
    side : {
      type : String,
      required : true,
    },
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
