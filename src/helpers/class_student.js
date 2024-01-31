const postgres = require("../sequlize");
const createClassStudentData = async (class_id, student_id) => {
    const client = postgres.getClient();
    try {
        const params = [class_id, student_id];
        console.log(class_id)
        const query = `INSERT INTO class_students (class_id,student_id) VALUES ($1, $2) RETURNING *`;
        const createData = await client.query(query, params);
        console.log("Student Assign to Class!");
        return { data: createData.rows };
    } catch (err) {
        console.log(err);
        return { err: err }
    }
};
const getClassCommonStudentData = async () => {
    const client = postgres.getClient();
    try {
        const query = `SELECT student_id
        FROM class_students
        GROUP BY student_id
        HAVING COUNT(DISTINCT class_id) = (SELECT COUNT(*) FROM classes) `;
        const getData = await client.query(query);
        console.log("Get common student in class!");
        return { data: getData.rows };
    } catch (err) {
        console.log(err);
        return { err: err }
    }
}
const getStudentClassMateData = async (studentId) => {
    try {
        const client = postgres.getClient();
        const params = [studentId];
        const query = `SELECT DISTINCT cs.student_id FROM class_students cs
    JOIN class_students sc ON cs.class_id = sc.class_id
    WHERE cs.student_id != sc.student_id AND sc.student_id = $1`;
        const getData = await client.query(query, params);
        console.log("Get common student in class!");
        return { data: getData.rows };
    } catch (err) {
        console.log(err);
        return { err: err }
    }

}
module.exports = { createClassStudentData, getClassCommonStudentData, getStudentClassMateData }