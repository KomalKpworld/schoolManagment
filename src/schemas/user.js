const postgres = require("../sequlize");

const createUsersTable = async () => {
  const client = postgres.getClient();
  try {
    const query =  `CREATE TABLE IF NOT EXISTS  users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role EXTRATRACKEDROLE,
    photo TEXT,
    invite_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
await client.query(query);
} catch (err) {
  console.log(err);
}
};

exports.createUsersTable = createUsersTable;