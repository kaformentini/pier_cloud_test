const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = lowdb(adapter);

module.exports = {
  async index(req, res) {
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
  },

  // async update(req, res) {
  //   const queryProduct = req.body
  //   db.get("products").find({queryProduct.find}).assign({queryProduct.change});
  // }
    
};
