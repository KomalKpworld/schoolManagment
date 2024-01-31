
const postgres = require("../sequlize");

const createClassStudentTable = async () => {
    const client = postgres.getClient();
    try {
        const query = `CREATE TABLE IF NOT EXISTS class_students (
            class_student_id SERIAL PRIMARY KEY,
            class_id INT REFERENCES classes(class_id),
            student_id INT REFERENCES students(student_id)
        )`;
        await client.query(query);
    } catch (err) {
        console.log(err);
    }
};
exports.createClassStudentTable = createClassStudentTable;