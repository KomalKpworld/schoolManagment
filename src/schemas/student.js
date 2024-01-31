const postgres = require("../sequlize");

const createStudentTable = async () => {
    const client = postgres.getClient();
    try {
        const query = `CREATE TABLE IF NOT EXISTS  Students(
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    photo VARCHAR(200),
    school_id INT REFERENCES schools(school_id)
)`;
        await client.query(query);
    } catch (err) {
        console.log(err);
    }
};

exports.createStudentTable = createStudentTable;