
const { createSchoolData,getMySchoolData } = require('../helpers/school')

const createSchool = async (req, res) => {
    try {
        const user = req.user;
        const { name } = req.body;
        let photo = req.files.photo
        const { err, data } = await createSchoolData(name,photo,user);
        if (err) return res.status(400).json({ err });
        return res.status(201).json({ message: "School Created!", data: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message || JSON.stringify(err) });
    }
};
const getMySchool = async(req,res)=>{
    try {
        const invite_code = req.params.invite_code
        const { err, data } = await getMySchoolData(invite_code );
        if (err) return res.status(400).json({ err });
        return res.status(200).json({ message: "Get School Data!", data: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message || JSON.stringify(err) });
    }
}
module.exports ={createSchool, getMySchool}