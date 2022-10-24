const express = require ('express')
const router = express.Router()

const {features} = require ('../models')

router.get("/", async (req, res) => {
    const featuresList = await features.findAll()
    res.json(featuresList);
});

module.exports = router;