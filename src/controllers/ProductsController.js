const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = lowdb(adapter);

module.exports = {
  async index(req, res) {
    console.log("aqui");
    const products = db.get('products').value();
    return res.json(products);
  },
};

// function getProducts(){
//   console.log("aqui2");

//   const products = db.get('product').value();
//   return products
// }

function createProduct() {
  db.get("product")
    .push({
      name: "cadeira",
      id: 01,
      amount: 20,
      description: "vermelha",
    })
    .write();
}
