const express = require ('express')
const router = express.Router()

const {results} = require ('../models')

router.get("/", async (req, res) => {
    const resultsList = await results.findAll()
    res.json(resultsList);
});

router.post("/", async (req, res) => {
    const {selection,secondOption, thirdOption, fourthOption} = req.body;
    await results.create({
        selection: selection,
        secondOption: secondOption,
        thirdOption: thirdOption,
        fourthOption: fourthOption
    });
    res.json("results saved Successfully")
});

module.exports = router;