const express = require ('express')
const router = express.Router()
var md5 = require('md5');

const {clients} = require ('../models')

router.get("/", async (req, res) => {
    const userList = await clients.findAll()
    res.json(userList);
});

router.post("/", async (req, res) => {
    const {USERNAME,PASSWORD} = req.body;
    await clients.create({
        USERNAME: md5(USERNAME),
        PASSWORD:md5(PASSWORD)
    });
    res.json("success")
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    var usernameEncripted = md5(username)
    var passwordEncripted = md5(password)
    const user = await clients.findOne({where: {USERNAME: usernameEncripted}})
    var userExists = true
    if(!user){
        userExists = false
        res.json("Usuario no existe");
    }
    if(userExists === true){
        if (passwordEncripted != user.dataValues.PASSWORD){
            res.json("Contraseña invalida")
        }
        else{
            res.json(user.dataValues.id)
        }
    }
})

module.exports = router;