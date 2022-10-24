const express = require ('express')
const router = express.Router()

const {names} = require ('../models')

router.get("/", async (req, res) => {
    const namesList = await names.findAll()
    res.json(namesList);
});

module.exports = router;