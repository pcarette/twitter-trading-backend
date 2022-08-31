const { Schema, model } = require("mongoose");

const linkedExchangeSchema = new Schema({
  exchange: {
    type: String,
    enum: ["Binance", "FTX", "KuCoin", "ByBit"],
  },
  apiKey: String,
  leverage: {
    type : Number,
    default : 1,
  }
});

const LinkedExchange = model("LinkedExchange", linkedExchangeSchema);

module.exports = LinkedExchange;
