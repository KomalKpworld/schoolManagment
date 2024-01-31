const express = require("express");
const studentClassController = require("../controllers/class_student");
const auth = require("../middlware/auth")
const teacherAuth = require("../middlware/checkTeacherAuth")
const studentClassRouter = express.Router();

studentClassRouter.post("/", auth,teacherAuth,studentClassController.createClassStudent)
studentClassRouter.get("/", auth, studentClassController.getCommonStudentInAllClass)
studentClassRouter.get("/:studentId",auth,studentClassController.getClassMateDataOfStudent)

module.exports = studentClassRouter;