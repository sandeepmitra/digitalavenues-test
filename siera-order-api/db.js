const mysql = require("mysql");
const port = 5000;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "siera_db_admin",
  password: "aa63PSQf8u4*sSIa",
  database: "siera_store"
});

pool.getConnection(function (err, connection) {
  if (err) {
    console.log("DB Connection Error", JSON.stringify(err));
  } else {
    console.log("DB Connected ...");
    module.exports = connection;
    const app = require("./app");
    app.listen(port, () => {
      console.log(`Siera Strore API is Running at .. http://localhost:${port}`);
    });
  }
});
