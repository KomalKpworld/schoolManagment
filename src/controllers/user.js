const jwt = require("jsonwebtoken");
const { createUser, userLogin } = require('../helpers/user')

const signUp = async (req, res) => {
    try {
        const { name, email, password, role, invite_code } = req.body;
        let photo = req.files.photo
        const { err, data } = await createUser(name, email, password, role, photo, invite_code);
        if (err) return res.status(200).json({ err });
        return res.status(200).json({ message: "User Created!", data: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message || JSON.stringify(err) });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const { err, data } = await userLogin(email, password);
        if (err) return res.status(200).json({ err });
        return res.status(200).json({ message: "User Login!", data: email, token: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message || JSON.stringify(err) });
    }
}
module.exports = { signUp, loginUser }