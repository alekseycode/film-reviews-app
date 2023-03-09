const express = require('express')
const app = express();

const cors = require('cors')
const corsOptions = {
    origin: "http://localhost:3000",
    optionSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require('dotenv').config();
const sessions = require('express-session')
const cookieParser = require('cookie-parser');

app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(sessions({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false, 
    cookie: { maxAge: 1000 * 60 * 60 }
}))

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