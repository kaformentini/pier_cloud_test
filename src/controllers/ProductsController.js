const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
// const { delete } = require("../routes");

const adapter = new FileSync("db.json");
const db = lowdb(adapter);

module.exports = {
  async list(req, res) {
    // console.log("aqui");
    const products = db.get("products").value();
    return res.json(products);
  },

  async create(req, res) {
    const product = req.body;
    console.log(product);
    db.get("products")
      .push({
        name: product.name,
        id: product.id,
        amount: product.amount,
        description: product.description,
      })
      .write();
    return res.sendStatus("201");
  },

  async show(req, res) {
    const queryProduct = req.params;
    console.log(queryProduct);
    const product = db
      .get("products")
      .find({ id: Number(queryProduct.id) })
      .value();
    return res.json(product);
  },

  async update(req, res) {
    const queryProduct = req.params;
    const productChanges = req.body;
    db.get("products")
      .find({ id: Number(queryProduct.id) })
      .assign(productChanges)
      .write();
    return res.sendStatus("204");
  },

  async delete(req, res) {
    const queryProduct = req.params;
    db.get("products")
      .remove({ id: Number(queryProduct.id) })
      .write();
    return res.sendStatus("204");
  },
};
