const express = require("express");
const routes = express.Router();

const ProductsController = require('./controllers/ProductsController');

routes.get("/products", (ProductsController.index));

module.exports = routes;
