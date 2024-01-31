const express = require("express");
const studentController = require("../controllers/student");
const auth = require("../middlware/auth")
const teacherAuth = require("../middlware/checkTeacherAuth")
const studentRouter = express.Router();

studentRouter.post("/", auth, teacherAuth, studentController.createStudent)
studentRouter.get("/", auth, teacherAuth, studentController.getStudent)


module.exports = studentRouter;