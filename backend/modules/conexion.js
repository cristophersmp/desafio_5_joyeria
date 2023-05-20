const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "123",
  host: "localhost",
  database: "joyas",
  port: 5432,
  allowExitOnIdle: true,
});

module.exports = pool;
