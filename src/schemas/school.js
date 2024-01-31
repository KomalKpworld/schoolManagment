const postgres = require("../sequlize");

const createSchoolsTable = async () => {
    const client = postgres.getClient();
    try {
        const query = `CREATE TABLE IF NOT EXISTS  Schools (
        school_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        photo VARCHAR(200),
        invite_code VARCHAR(4),
        user_id INT REFERENCES users(user_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
        await client.query(query);
    } catch (err) {
        console.log(err);
    }
};

exports.createSchoolsTable = createSchoolsTable;