const express = require("express");
const cors = require("cors");
const ordersController = require("./controllers/ordersController");
const productsController = require("./controllers/productsController");
const router = express.Router();

router.use(cors());

router.get("/", function (req, res) {
  res.send("Siera Store API Backend Running ...");
});

router.get("/get-products", productsController.getProducts);

router.get("/get-top-products", productsController.getTopProducts);

router.get("/get-all-sell-data", productsController.getAllSells);

router.get("/get-month-sell-data", productsController.getMonthSells);

router.get("/get-qty-sell", productsController.getQtySell);

router.post("/new-order", ordersController.addOrder);

module.exports = router;
