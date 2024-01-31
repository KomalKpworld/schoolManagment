
const { createStudentData,getStudentData} = require('../helpers/student')

const createStudent = async (req, res) => {
    try { 
        const { name,school_id} = req.body;
        let photo = req.files.photo
        const { err, data } = await createStudentData(name,photo,school_id);
        if (err) return res.status(200).json({ err });
        return res.status(200).json({ message: "Student Created!", data: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message || JSON.stringify(err) });
    }
};
const getStudent = async(req,res)=>{
    try { 
        const {school_id, class_id} = req.query
        const { err, data } = await getStudentData(school_id, class_id);
        if (err) return res.status(200).json({ err });
        return res.status(200).json({ message: "Student Created!", data: data });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message || JSON.stringify(err) });
    }
}
module.exports ={createStudent, getStudent}