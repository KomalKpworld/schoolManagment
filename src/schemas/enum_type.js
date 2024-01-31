const postgres = require("../sequlize");

const createEnumTypes = async () => {
  const client = postgres.getClient();
  try {
    const createFunctionQuery = `CREATE OR REPLACE FUNCTION create_custom_type_if_not_exists()
                                   RETURNS VOID AS
                                 $$
                                 BEGIN
                                     IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'EXTRATRACKEDROLE') THEN
                                         EXECUTE 'CREATE TYPE EXTRATRACKEDROLE AS ENUM (''Admin'',''Teacher'',''Parent'' ,''N/A'')';
                                     END IF;
                                 END;
                                 $$ LANGUAGE plpgsql;`;
    const callFunctionQuery = `SELECT create_custom_type_if_not_exists();`;
    await client.query(createFunctionQuery);
    await client.query(callFunctionQuery).catch(() => {});
  } catch (err) {
    console.log(err);
  }
};

exports.createEnumTypes = createEnumTypes;