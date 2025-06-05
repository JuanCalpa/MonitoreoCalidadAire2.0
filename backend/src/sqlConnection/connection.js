const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "admin",
  database: "MonitoreoCalidadAire",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection;