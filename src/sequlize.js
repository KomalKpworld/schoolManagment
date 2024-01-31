const { Client } = require("pg");
const { createUsersTable } = require("./schemas/user")
const { createEnumTypes } = require("./schemas/enum_type");
const { createSchoolsTable } = require("./schemas/school");
const { createClassesTable } = require("./schemas/class");
const { createStudentTable } = require("./schemas/student")

const { createClassStudentTable } = require("./schemas/class_student")
let client;
const initPostgresClient = async () => {
  try {
    client = new Client({
      user: process.env.USER,
      host: process.env.HOST,
      database: process.env.DATABSE,
      password: process.env.PASSWORD,
      port: 5432,
    });

    await client.connect();
    console.log("Database Connected")
  } catch (err) {
    console.log(err);
  }
};

const getClient = () => {
  return client;
};

const createTables = async () => {
  await createEnumTypes()
  await createUsersTable()
  await createSchoolsTable()
  await createClassesTable()
  await createStudentTable()
  await createClassStudentTable()

};

exports.createTables = createTables;
exports.initPostgresClient = initPostgresClient;
exports.getClient = getClient;
