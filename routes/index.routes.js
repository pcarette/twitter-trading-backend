const needle = require("needle");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

router.post("/fake-order", async (req, res, next) => {
  const ByBitOrder = await needle.get("https://api-testnet.bybit.com/v2/private/wallet/balance?api_key={api_key}&coin=BTC&timestamp={timestamp}&sign={sign}")
})

module.exports = router;
