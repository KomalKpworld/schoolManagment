const postgres = require("../sequlize");
const createClassData = async (name,school_id) => {
    const client = postgres.getClient();
    try {
        const params = [name,school_id];
        const query = `INSERT INTO classes (name,school_id) VALUES ($1, $2) RETURNING *`;
        const createData = await client.query(query, params);
        console.log("Class Created!");
        return { data: createData.rows };
    } catch (err) {
        return {err: err}
    }
};
const getClassInSchoolData = async(schoolId)=>{
    const client = postgres.getClient();
    try { 
        const params = [schoolId];
        const query = `SELECT * FROM  classes WHERE school_id = $1 `;
        const getData = await client.query(query, params);
        console.log("Get Class!");
        return { data: getData.rows };
    } catch (err) {
        console.log(err);
        return {err: err}
    } 
}
module.exports = {createClassData, getClassInSchoolData  }