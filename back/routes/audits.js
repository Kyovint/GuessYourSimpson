const express = require ('express')
const router = express.Router()

const {audits} = require ('../models')

router.get("/", async (req, res) => {
    const auditsList = await audits.findAll()
    res.json(auditsList);
});

router.post("/", async (req, res) => {
    const {idClient,answers} = req.body;
    await audits.create({
        idClient: idClient,
        answers: answers
    });
    res.json("logs Created Successfully")
});

module.exports = router;