
const { Pool } = require("pg");
require("dotenv").config();

const connPoolInfo = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  max: process.env.PG_MAX,
  idleTimeoutMillis: process.env.PG_IDLETIMEOUTMILLIS,
  connectionTimeoutMillis: process.env.PG_CONNECTIONTIMEOUTMILLIS,
};

const pool = new Pool(connPoolInfo);

module.exports = {
  pool,
};
