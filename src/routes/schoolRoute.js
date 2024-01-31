const express = require("express");
const schoolController = require("../controllers/school");
const auth = require("../middlware/auth")
const authorization = require("../middlware/checkAdminAuth")
const schoolRouter = express.Router();

schoolRouter.post("/", auth, authorization ,schoolController.createSchool)
schoolRouter.get("/:invite_code", schoolController.getMySchool)

module.exports = schoolRouter;