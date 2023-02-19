const express = require('express')
const app = express();
require('dotenv').config()


app.get('/', (req, res) => {
    res.json({payload: "Sup baud"})
})

const dbRouter = require('./routers/dbRouter');

app.use('/api', dbRouter)


const PORT = process.env.API_PORT;

app.listen(PORT, (req, res) => {
    console.log(`Server listening on ${PORT}`)
})