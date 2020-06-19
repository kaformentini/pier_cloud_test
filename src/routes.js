const express = require("express");
const bodyParser = require('body-parser')

const routes = express.Router();
routes.use(bodyParser.json())

const ProductsController = require('./controllers/ProductsController');
const WarehouseController = require('./controllers/WarehouseController');

routes.get("/products", (ProductsController.list));
routes.get("/product/:id", (ProductsController.show));
routes.post("/products", (ProductsController.create));
routes.put("/product/:id", (ProductsController.update));
routes.delete("/product/:id", (ProductsController.delete));

routes.put("/product_warehouse/:id", (WarehouseController.updateProductWarehouse));
routes.put("/product_amount_decrese/:id", (WarehouseController.updateAmount));


module.exports = routes;
