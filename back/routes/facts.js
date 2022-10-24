const express = require ('express')
const router = express.Router()

const {facts} = require ('../models')

router.get("/", async (req, res) => {
    const factsList = await facts.findAll()
    res.json(factsList);
});

module.exports = router;