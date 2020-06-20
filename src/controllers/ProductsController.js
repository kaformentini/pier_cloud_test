const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = lowdb(adapter);

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async list(req, res) {
    const products = db.get("products").value();
    const productsNum = products.length;

    const productsWithWarehouses = products.map(function (product) {
      const productWarehouse = db
        .get("productWarehouse")
        .filter({ productId: product.id })
        .value();
      product.warehouses = productWarehouse;
      return product;
    });

    // for (var i = 0; i < (productsNum); i++) {
    //   const product = products[i]
    //   const productWarehouse = db.get("productWarehouse").filter({ productId: product.id }).value();
    //   products[i].warehouses = productWarehouse
    // }

    return res.json(productsWithWarehouses);
  },

  async create(req, res) {
    const product = req.body;
    const productWarehouse = product.warehouses.length;

    const newId = createUniqId();

    db.get("products")
      .push({
        name: product.name,
        id: newId,
        description: product.description,
      })
      .write();

    for (var i = 0; i < productWarehouse; i++) {
      setWarehouse(product.warehouses[i], newId);
    }

    return res.sendStatus("201");
  },

  async show(req, res) {
    const queryProduct = req.params;
    const product = db.get("products").find({ id: queryProduct.id }).value();
    return res.json(product);
  },

  async update(req, res) {
    const queryProduct = req.params;
    const productChanges = req.body;
    db.get("products")
      .find({ id: queryProduct.id })
      .assign(productChanges)
      .write();
    return res.sendStatus("204");
  },

  async delete(req, res) {
    const queryProduct = req.params;
    db.get("products").remove({ id: queryProduct.id }).write();
    db.get("productWarehouse").remove({ productId: queryProduct.id }).write();
    return res.sendStatus("204");
  },
};

function createUniqId() {
  return uuidv4();
}

function setWarehouse(product, newId) {
  db.get("productWarehouse")
    .push({
      productId: newId,
      warehouseId: product.warehouseId,
      amount: product.amount,
    })
    .write();
}

// function newId(){
//   const lastProduct = db.get("products").last().value();
//   const newId = Number(lastProduct.id) + 1;
//   return newId;
// }
