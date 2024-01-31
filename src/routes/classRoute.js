const express = require("express");
const classController = require("../controllers/class");
const auth = require("../middlware/auth")
const teacherAuth = require("../middlware/checkTeacherAuth")
const classRouter = express.Router();

classRouter.post("/", auth, teacherAuth,classController.createClass)
classRouter.get("/:schoolId", auth, classController.getClassBySchool)


module.exports = classRouter;