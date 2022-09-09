const LinkedExchange = require("../models/LinkedExchange.model");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const { exchange, apiKey, apiSecret } = req.body;
    console.log({ exchange, apiKey, apiSecret });
    const createdLinkedExchange = await LinkedExchange.create({
      apiKey,
      exchange,
      apiSecret,
    });
    res
      .status(201)
      .json({
        message: `LinkedExchange successuflly created : ${createdLinkedExchange}`,
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
