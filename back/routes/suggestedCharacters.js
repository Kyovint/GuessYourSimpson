const express = require ('express')
const router = express.Router()

const {suggestedCharacters} = require ('../models')

router.get("/", async (req, res) => {
    const suggestedCharactersList = await suggestedCharacters.findAll()
    res.json(suggestedCharactersList);
});

router.post("/", async (req, res) => {
    const {idClient,idAudit, idResults} = req.body;
    await suggestedCharacters.create({
        idClient: idClient,
        idAudit: idAudit,
        idResults: idResults,
    });
    res.json("Options loaded successfully")
});

module.exports = router;