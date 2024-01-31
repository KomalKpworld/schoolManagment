const postgres = require("../sequlize");

const createClassesTable = async () => {
    const client = postgres.getClient();
    try {
        const query = `CREATE TABLE IF NOT EXISTS  classes (
    class_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    school_id INT REFERENCES Schools(school_id)
)`;
        await client.query(query);
    } catch (err) {
        console.log(err);
    }
};

exports.createClassesTable = createClassesTable;