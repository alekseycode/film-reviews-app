const express = require('express')
const app = express();
require('dotenv').config()

app.get('/', (req, res) => {
    res.json({payload: "Sup baud"})
})

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
    console.log(`Server listening on ${PORT}`)
})