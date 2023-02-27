const express = require('express')
const app = express();
require('dotenv').config();

const cors = require('cors')
const corsOptions = {
    origin: "*",
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({payload: "Sup baud, welcome to the server side"})
})

const dbRouter = require('./routers/dbRouter');
app.use('/api', dbRouter);

const authRouter = require('./routers/authRouter');
app.use('/auth', authRouter);


const PORT = process.env.API_PORT;

app.listen(PORT, (req, res) => {
    console.log(`Server listening on ${PORT}`)
})