const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = lowdb(adapter);

module.exports = {
  async showProductWarehouse(req, res) {
    const queryProduct = req.params;
    const productWarehouse = db.get("productWarehouse").filter({ productId: queryProduct.id }).value();
    return res.json(productWarehouse);
  },

  async updateProductWarehouse(req, res) {
    const queryProduct = req.params;
    const warehouseChanges = req.body;
    console.log(queryProduct, warehouseChanges);
    db.get("productWarehouse")
      .find({ productId: queryProduct.id })
      .assign(warehouseChanges)
      .write();
    return res.sendStatus("204");
  },

  async updateAmount(req, res) {
    const queryProduct = req.params;
    const amountDecrese = Number(req.body.sold);

    const product = db
      .get("productWarehouse")
      .find({ productId: queryProduct.id })
      .value();

    const newAmount = Number(product.amount) - amountDecrese;

    db.get("productWarehouse")
      .find({ productId: queryProduct.id })
      .assign({ amount: newAmount })
      .write();
    return res.sendStatus("204");
  },
};
