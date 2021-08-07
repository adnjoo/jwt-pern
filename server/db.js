const Pool = require("pg").Pool;

const pool = new Pool({
  user: "andrewnjoo",
  password: "",
  host: "localhost",
  port: 5432,
  database: "jwttutorial",
});

module.exports = pool;
