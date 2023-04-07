const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: process.env.ORIGIN_DOMAIN,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/", (req, res) => {
  res.json({ payload: "Sup baud, welcome to the server side" });
});

const dbRouter = require("./routers/dbRouter");
app.use("/api", dbRouter);

const authRouter = require("./routers/authRouter");
app.use("/auth", authRouter);

const PORT = process.env.API_PORT;

app.listen(PORT, (req, res) => {
  console.log(`Server listening on ${PORT}`);
});
