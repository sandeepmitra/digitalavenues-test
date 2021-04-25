const Product = require("../models/Product");

exports.getProducts = async function (req, res) {
  try {
    const products = await Product.getAllProducts();
    res.send({ products: products });
  } catch (err) {
    res.send("No Products found");
  }
};

exports.getTopProducts = async function (req, res) {
  try {
    const topProducts = await Product.getTopProducts();
    res.send({ topProducts: topProducts });
  } catch (err) {
    res.send("No Products found");
  }
};

exports.getAllSells = async function (req, res) {
  try {
    const sellData = await Product.getSellData();
    res.send({ sellData: sellData });
  } catch (err) {
    res.send("No Products found");
  }
};

exports.getMonthSells = async function (req, res) {
  try {
    const monthSellData = await Product.getMonthSellData();
    res.send({ monthSellData: monthSellData });
  } catch (err) {
    res.send("No Products found");
  }
};

exports.getQtySell = async function (req, res) {
  try {
    const getQtySellData = await Product.getQtySellData();
    res.send({ getQtySellData: getQtySellData });
  } catch (err) {
    res.send("No Products found");
  }
};
