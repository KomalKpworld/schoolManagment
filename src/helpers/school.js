const postgres = require("../sequlize");
var path = require('path');
function generateRandomCode() {
    const randomDecimal = Math.floor(Math.random() * 9000) + 1000;
    const randomCode = randomDecimal.toString();
    console.log(randomCode)
    return randomCode;
}
const createSchoolData = async (name, photo, user) => {
    const client = postgres.getClient();
    try {
        if (photo) {
            let urlPath = photo.tempFilePath
            let url = (path.join(__dirname, '../../' + urlPath))
            photo = url
        }else{
            photo = ""
        }
        let invite_code = generateRandomCode();
        const params = [name, photo, invite_code, user.user_id];
        const query = `INSERT INTO schools (name,photo,invite_code, user_id) VALUES ($1, $2, $3, $4) RETURNING *`;
        const createData = await client.query(query, params);
        const updateParams = [user.user_id]
        const updateQuery = `UPDATE users SET invite_code = ${invite_code} where user_id =$1`
        const updateData = await client.query(updateQuery,updateParams);
        console.log("School Created!");
        return { data: createData.rows };
    } catch (err) {
        console.log(err);
        return {err: err}
    }
};
const getMySchoolData = async(invite_code)=>{
    const client = postgres.getClient();
    try {           
        const params = [invite_code];
        const query = `
        SELECT
          u.*,
          s.*
        FROM
          users u
        JOIN
          schools s ON u.invite_code = s.invite_code
        WHERE
          u.invite_code = $1;
      `;
        const createData = await client.query(query, params);
        console.log("School Created!");
        return { data: createData.rows };
    } catch (err) {
        console.log(err);
        return {err: err}
    }
}
module.exports = { createSchoolData, getMySchoolData}