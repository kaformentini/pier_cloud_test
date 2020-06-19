const express = require("express");
const bodyParser = require('body-parser')

const routes = express.Router();
routes.use(bodyParser.json())

const ProductsController = require('./controllers/ProductsController');

routes.get("/products", (ProductsController.list));
routes.get("/product/:id", (ProductsController.show));
routes.post("/products", (ProductsController.create));
routes.put("/product/:id", (ProductsController.update));
routes.delete("/product/:id", (ProductsController.delete));


module.exports = routes;
