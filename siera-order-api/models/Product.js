const db = require("../db");

let Product = function (data, productid) {
  this.data = data;
  this.errors = [];
  this.productid = productid;
};

Product.getAllProducts = function () {
  return new Promise(async function (resolve, reject) {
    await db.query("SELECT * FROM `products`", function (error, results, fields) {
      if (!error) {
        resolve(results);
      } else {
        console.log("mySQL Error:", error);
        reject();
      }
    });
  });
};

Product.getTopProducts = function () {
  let currentDate = new Date();
  const maxDate = currentDate.toISOString().split("T")[0];
  currentDate.setDate(currentDate.getDate() - 7);
  const minDate = currentDate.toISOString().split("T")[0];

  return new Promise(async function (resolve, reject) {
    await db.query(`SELECT orders.product_id, COUNT(*) totalCount, SUM(sale_price) total_selling_price, product_name FROM orders JOIN products ON orders.product_id= products.product_id WHERE orders.order_date >= '${minDate}' AND orders.order_date <= '${maxDate}' GROUP BY orders.product_id LIMIT 20`, function (error, results, fields) {
      if (!error) {
        //console.log(results);
        resolve(results);
      } else {
        console.log("mySQL Error:", error);
        reject();
      }
    });
  });
};

Product.getSellData = function () {
  return new Promise(async function (resolve, reject) {
    await db.query(`SELECT orders.product_id, COUNT(*) totalCount, SUM(sale_price) total_selling_price, product_name FROM orders JOIN products ON orders.product_id= products.product_id GROUP BY orders.product_id`, function (error, results, fields) {
      if (!error) {
        //console.log(results);
        resolve(results);
      } else {
        console.log("mySQL Error:", error);
        reject();
      }
    });
  });
};

Product.getMonthSellData = function () {
  return new Promise(async function (resolve, reject) {
    await db.query(
      `select year(order_date) AS 'year',month(order_date) AS 'month',sum(sale_price) AS 'total_sale'
      from orders
      group by year(order_date),month(order_date)
      order by year(order_date),month(order_date);`,
      function (error, results, fields) {
        if (!error) {
          //console.log(results);
          resolve(results);
        } else {
          console.log("mySQL Error:", error);
          reject();
        }
      }
    );
  });
};

Product.getQtySellData = function () {
  return new Promise(async function (resolve, reject) {
    await db.query(
      `select year(order_date) AS 'year',month(order_date) AS 'month', COUNT(*) totalCount,sum(sale_price) AS 'total_sale'
        from orders
        group by year(order_date),month(order_date)
        order by year(order_date),month(order_date);`,
      function (error, results, fields) {
        if (!error) {
          //console.log(results);
          resolve(results);
        } else {
          console.log("mySQL Error:", error);
          reject();
        }
      }
    );
  });
};

module.exports = Product;
