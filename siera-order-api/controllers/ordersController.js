const Order = require("../models/Orders");

exports.addOrder = async function (req, res) {
  let order = new Order(req.body);
  //console.log(req.body);
  const addNewOrder = await order.newOrder();
  if (order.errors.length) {
    res.status(201).send(order.errors);
  } else {
    res.status(200).send("New Order Added ...");
  }
};
