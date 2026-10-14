const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const authRouter = require("./routes/auth.routes");

app.use("/api/v1/auth",authRouter);

module.exports = app;
