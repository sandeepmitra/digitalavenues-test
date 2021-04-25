const db = require("../db");
const validator = require("validator");

let Order = function (data) {
  this.data = data;
  this.errors = [];
};

Order.prototype.cleanIp = function () {
  if (typeof this.data.orderDate != "string") {
    this.data.orderDate = "";
  }
  if (typeof this.data.productId != "number") {
    this.data.orderDate = "";
  }
  if (typeof this.data.price != "string") {
    this.data.orderDate = "";
  }
  if (typeof this.data.salePrice != "string") {
    this.data.orderDate = "";
  }

  // Sanitize Data
  this.data = {
    orderDate: this.data.orderDate,
    productId: this.data.productId,
    price: this.data.price,
    salePrice: this.data.salePrice
  };
};

Order.prototype.validate = function () {
  if (this.data.orderDate == "") {
    this.errors.push("Date field is empty");
  }
  if (this.data.productId == "") {
    this.errors.push("Product field is empty");
  }
  if (!validator.isDate(this.data.orderDate)) {
    this.errors.push("Enter a valid date");
  }
};

Order.prototype.newOrder = function () {
  this.cleanIp();
  this.validate();

  if (!this.errors.length) {
    orderData = {
      product_id: this.data.productId,
      sale_price: this.data.salePrice,
      order_date: this.data.orderDate
    };

    console.log(orderData);
    return new Promise(async function (resolve, reject) {
      await db.query("INSERT INTO orders SET ?", orderData, function (error, results, fields) {
        if (!error) {
          resolve(results);
        } else {
          console.log("mySQL Error:", error);
          reject();
        }
      });
    });
  }
};

module.exports = Order;
