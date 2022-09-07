const { Schema, model } = require("mongoose");
const needle = require("needle");

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
  investmentPercentagePerOrder: {
    type: Number,
    default: 0.8,
  },
});

linkedExchangeSchema.method.placeOrder = async function placeOrder(
  currency,
  orderSide,
  targetPrice,
  takeProft,
  stopLoss
) {
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
      console.log("ByBit api call :");
      try {
        const futuresBalance = await needle.get("https://api.bybit.com/v2/private/wallet/balance")
        needle.post("https://api.bybit.com/private/linear/order/create", {
          api_key: this.apiKey,
          side: orderSide === "LONG" ? "Buy" : "Sell",
          symbol: `${currency}USDT`,
          order_type: "Limit",
          qty: 10,
          price: targetPrice,
          time_in_force: "GoodTillCancel",
          timestamp: { timestamp },
          sign: "{sign}",
        });
      } catch (error) {
        console.log("An error occured : ", error);
      }
      break;
  }
};

const LinkedExchange = model("LinkedExchange", linkedExchangeSchema);

module.exports = LinkedExchange;
