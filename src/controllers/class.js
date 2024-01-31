
const { createClassData, getClassInSchoolData } = require('../helpers/class')

const createClass = async (req, res) => {
    try {
        const { name, school_id } = req.body;
        const { err, data } = await createClassData(name, school_id);
        if (err) {
            return res.status(400).json({ err })
        }else{
        return res.status(201).json({ message: "Class Created!", data: data });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message || JSON.stringify(err) });
    }
};
const getClassBySchool = async (req, res) => {
    try {
        const schoolId = req.params.schoolId
        const { err, data } = await getClassInSchoolData(schoolId);
        if (err) return res.status(400).json({ err });
        return res.status(200).json({ message: "Get class List!", data: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message || JSON.stringify(err) });
    }
}
module.exports = { createClass, getClassBySchool }