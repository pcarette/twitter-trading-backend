const LinkedExchange = require("../models/LinkedExchange.model");
const { use } = require("./index.routes");

const router = require("express").Router();

router.post("/place-order", async (req, res, next) => {
    try {
        const myUsers = await LinkedExchange.find();
        console.log("Users founded : ", myUsers)
        console.log("awaiting function")
        await myUsers[0].placeOrder()
        console.log("Test passed")
        res.status(200).json("Order Successfully created.")
    } catch (error) {
        
    }
})

module.exports = router