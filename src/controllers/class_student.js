const { createClassStudentData, getClassCommonStudentData, getStudentClassMateData } = require('../helpers/class_student')

const createClassStudent = async (req, res) => {
    try {
        const { class_id, student_id } = req.body;
        const { err, data } = await createClassStudentData(class_id, student_id);
        if (err) return res.status(400).json({ err });
        return res.status(201).json({ message: "Student Assign to Class!", data: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message || JSON.stringify(err) });
    }
};
const getCommonStudentInAllClass = async (req, res) => {
    try {
        const { err, data } = await getClassCommonStudentData();
        if (err) return res.status(400).json({ err });
        return res.status(201).json({ message: "Get Common Stuend in Class!", data: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message || JSON.stringify(err) });
    }
};
const getClassMateDataOfStudent = async (req, res) => {
    try {
        const studentId = req.params.studentId
        const { err, data } = await getStudentClassMateData(studentId);
        if (err) return res.status(400).json({ err });
        return res.status(201).json({ message: "Get Classmate !", data: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message || JSON.stringify(err) });
    }
}
module.exports = { createClassStudent, getCommonStudentInAllClass, getClassMateDataOfStudent }