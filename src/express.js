const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const userRoute = require("./routes/userRoutes");
const schoolRoute = require("./routes/schoolRoute");
const classRoute = require("./routes/classRoute");
const classStudentRoute = require("./routes/classStudentRoute");
const studentRoute = require("./routes/studentRoute")

const { initPostgresClient, createTables } = require("./sequlize")

const initializeExpress = (app) => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, async () => {
        console.log(`⚡️ Express app is running on port: ${PORT}`);
        await initPostgresClient();
        await createTables();
    });
};
const handleRequests = (app) => {
    app.use(bodyParser.json());
    app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : './tmp/'
    }));
    app.use("/user", userRoute);
    app.use("/school", schoolRoute)
    app.use("/class", classRoute)
    app.use("/class-student", classStudentRoute)
    app.use("/student", studentRoute)

};

exports.initializeExpress = initializeExpress;
exports.handleRequests = handleRequests;
