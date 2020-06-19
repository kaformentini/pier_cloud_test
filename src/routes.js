const express = require("express");
const bodyParser = require('body-parser')

const routes = express.Router();
routes.use(bodyParser.json())

const ProductsController = require('./controllers/ProductsController');
const WerehouseController = require('./controllers/WerehouseController');

routes.get("/products", (ProductsController.list));
routes.get("/product/:id", (ProductsController.show));
routes.post("/products", (ProductsController.create));
routes.put("/product/:id", (ProductsController.update));
routes.delete("/product/:id", (ProductsController.delete));

routes.put("/productwerehouse/:id", (WerehouseController.updateProductWerehouse));
routes.put("/product_amount_decrese/:id", (WerehouseController.updateAmount));


module.exports = routes;
