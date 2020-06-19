const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = lowdb(adapter);

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async list(req, res) {
    // console.log("aqui");
    const products = db.get("products").value();

    return res.json(products);
  },

  async create(req, res) {
    const product = req.body;

    const newId = uuidv4();
    db.get("products")
      .push({
        name: product.name,
        id: newId,
        description: product.description,
      })
      .write();
    db.get("productWerehouse")
      .push({
        productId: newId,
        werehouseId: product.werehouseId,
        amount: product.amount,
      })
      .write();
    return res.sendStatus("201");
  },

  async show(req, res) {
    const queryProduct = req.params;
    console.log(queryProduct);
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
    db.get("productWerehouse").remove({ productId: queryProduct.id }).write();
    return res.sendStatus("204");
  },
};

// function newId(){
//   const lastProduct = db.get("products").last().value();
//   const newId = Number(lastProduct.id) + 1;
//   return newId;
// }
