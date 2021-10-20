const Pool = require("pg").Pool
require("dotenv").config()

const pool = new Pool({
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOSTNAME,
  port: process.env.DATABASE_PORT,
})

console.log("connected to postgres database successfully!")

module.exports = pool
