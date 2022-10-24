const express = require ('express')
const app = express ()
const cors = require ('cors')
const db = require ('./models')

app.use (express.json());
app.use (cors());
//Routers
////////////////////-------------------------

const clientsRouter = require('./routes/clients')
app.use("/clients", clientsRouter)

const featuresRouter = require('./routes/features')
app.use("/features", featuresRouter)

const namesRouter = require('./routes/names')
app.use("/names", namesRouter)

const auditsRouter = require('./routes/audits')
app.use("/audits", auditsRouter)

const factsRouter = require('./routes/facts')
app.use("/facts", factsRouter)

const suggestedCharactersRouter = require('./routes/suggestedCharacters')
app.use("/suggestedCharacters", suggestedCharactersRouter)

const questionsRouter = require('./routes/questions')
app.use("/questions", questionsRouter)

const resultsRouter = require('./routes/results')
app.use("/results", resultsRouter)

db.sequelize.sync().then(() => {
    app.listen(3002, () => {
        console.log("Server is running on port 3002")
    });
});