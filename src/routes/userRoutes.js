const express = require("express");
const usersController = require("../controllers/user");
const usersRouter = express.Router();

usersRouter.post("/", usersController.signUp)
usersRouter.post("/login", usersController.loginUser)

module.exports = usersRouter;
