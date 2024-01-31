const jwt = require("jsonwebtoken");
const {
  getUserByEmail,
} = require("../helpers/user");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") return next();

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(400).json({ err: "Authentication Failed!" });
    const decodedData = jwt.verify(token, "key");
    let user = await getUserByEmail(decodedData?.email);
    if (!user) return res.status(403).json({ err: "Authentication Failed!" });
    if (user.role !=="Teacher"){
        if(user.role != "Admin"){
          return res.status(403).json({ err: "dont have permission to create school" });    
        }
    }
    next()
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Authentication Failed!" });
  }
};
