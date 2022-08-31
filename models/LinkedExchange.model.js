const { Schema, model } = require("mongoose");

const linkedExchangeSchema = new Schema({
  exchange: {
    type: String,
    enum: ["Binance", "FTX", "KuCoin", "ByBit"],
  },
  apiKey: String,
  leverage: {
    type: Number,
    default: 1,
  },
});

linkedExchangeSchema.method.placeOrder = async function placeOrder() {
  switch (this.exchange) {
    case "Binance":
      console.log("Binance api call");
      break;
    case "FTX":
      console.log("api call FTX");
    case "KuCoin":
      console.log("api call KuCoin");
      break;
    case "ByBit":
      console.log("ByBit api call");
      break;
  }
};

const LinkedExchange = model("LinkedExchange", linkedExchangeSchema);

module.exports = LinkedExchange;
