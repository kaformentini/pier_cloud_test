const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = lowdb(adapter);

module.exports = {
  async updateProductWerehouse(req, res) {
    const queryProduct = req.params;
    const werehouseChanges = req.body;
    // console.log(queryProduct, productChanges)
    db.get("productWerehouse")
      .find({ productId: queryProduct.id })
      .assign(werehouseChanges)
      .write();
    return res.sendStatus("204");
  },

  async updateAmount(req, res) {
    const queryProduct = req.params;
    const amountDecrese = Number(req.body.sold);

    const product = db
      .get("productWerehouse")
      .find({ productId: queryProduct.id })
      .value();
      
    const newAmount = Number(product.amount) - amountDecrese;

    db.get("productWerehouse")
      .find({ productId: queryProduct.id })
      .assign({ amount: newAmount })
      .write();
    return res.sendStatus("204");
  },
};
