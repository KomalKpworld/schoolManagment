const postgres = require("../sequlize");
const jwt = require("jsonwebtoken");
var path = require('path');
const createUser = async (
    name,
    email,
    password,
    role,
    photo,
    invite_code,
) => {
    const client = postgres.getClient();
    try {
        const isEmailExsit = await getUserByEmail(email)
        if (isEmailExsit) {
            return { err: "Email should be unique" }
        }
        if (photo) {
            let urlPath = photo.tempFilePath
            let url = (path.join(__dirname, '../../' + urlPath))
            photo = url
        } else {
            photo = ""
        }

        if (!invite_code) {
            role = "Admin"
            invite_code = ""
        }
        if (invite_code) {
            let value = [invite_code]
            let query = `select invite_code from users where invite_code = $1`
            const findQuery = await client.query(query, value);
            if (!findQuery) {
                return { err: "invite code is invalid" }
            }
            if (role !== ("Teacher")) {
                if (role != "Parent") {
                    return { err: "role should be Teacher or Parent" }
                }
            }
        }
        const params = [name, email, password, role, photo, invite_code];
        const query = `INSERT INTO users (name,email,password,role,photo,invite_code) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *`;
        const createData = await client.query(query, params);
        console.log("User Created!");
        return { data: createData.rows };
    } catch (err) {
        console.log(err);
        return { err: err }
    }
};
const getUserByEmail = async (email) => {
    try {
        const client = postgres.getClient();
        const query = `SELECT * FROM users WHERE email = $1`;
        const res = await client.query(query, [email]);
        return res?.rows && res?.rows[0];
    } catch (err) {
        console.log(err);
        return { err: err }
    }
};
const userLogin = async (email, password) => {
    try {
        const client = postgres.getClient();
        let checkEmailParams = [email, password]
        console.log(email, password)
        let checkEmailQuery = `SELECT * FROM users WHERE email = $1 And password=$2`;
        const findQuery = await client.query(checkEmailQuery, checkEmailParams);
        if (findQuery.rows.length < 0) {
            return { err: "invalid provided data" }
        }
        let user = (findQuery.rows[0])
        const token = jwt.sign(
            {
                userId: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            "key",
        );
        console.log(token)
        console.log("User Login!");
        return { data: token };
    } catch (err) {
        console.log(err);
        return { err: err }
    }
}

module.exports = { createUser, userLogin, getUserByEmail }