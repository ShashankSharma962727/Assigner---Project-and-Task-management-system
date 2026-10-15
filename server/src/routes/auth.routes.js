const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controllers");
const upload = require("../middlewares/multer");
const authRouter = express.Router();

authRouter.post("/register",upload.single('avtar'), registerUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;