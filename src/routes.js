const express = require("express");
const bodyParser = require('body-parser')

const routes = express.Router();
routes.use(bodyParser.json())

const ProductsController = require('./controllers/ProductsController');

routes.get("/products", (ProductsController.index));

routes.post("/products", (ProductsController.create));

module.exports = routes;
