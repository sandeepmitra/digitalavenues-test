const express = require("express");
const app = express();
const db = require("./db");
const router = require("./router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// db.query("SELECT * FROM `products`", function (error, results, fields) {
//   console.log(results);
//   db.release();
//   if (error) {
//     console.log("mySQL Error:", error);
//   }
// });

app.use("/", router);

module.exports = app;
