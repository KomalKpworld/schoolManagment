const postgres = require("../sequlize");
var path = require('path');
const createStudentData = async (name, photo, school_id) => {
    const client = postgres.getClient();
    try {
        if (photo) {
            let urlPath = photo.tempFilePath
            let url = (path.join(__dirname, '../../' + urlPath))
            photo = url
        } else {
            photo = ""
        }
        const params = [name, photo, school_id];
        const query = `INSERT INTO Students (name,photo,school_id) VALUES ($1, $2, $3) RETURNING *`;
        const createData = await client.query(query, params);
        console.log("Student Created!");
        return { data: createData.rows };
    } catch (err) {
        console.log(err);
        return {err: err}
    }
};
const getStudentData = async (school_id, class_id) => {
    const client = postgres.getClient();
    try {
        const params = [school_id, class_id];
        const query = `SELECT
        s.*
      FROM
        students s
      JOIN
        class_students cs ON s.student_id = cs.student_id
      WHERE
        s.school_id = $1 OR cs.class_id = $2;
    `;
      const getData = await client.query(query, params);
        console.log("Get Student!");
        return { data: getData.rows };
    } catch (err) {
        console.log(err);
        return {err: err}
    }
}
module.exports = { createStudentData, getStudentData }