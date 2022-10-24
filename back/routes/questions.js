const express = require ('express')
const router = express.Router()

const {questions} = require ('../models')

router.get("/", async (req, res) => {
    const questionsList = await questions.findAll()
    res.json(questionsList);
});

module.exports = router;