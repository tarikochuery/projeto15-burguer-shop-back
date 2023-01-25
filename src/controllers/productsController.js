import COLLECTIONS from "../database/collections.js";
import { burguershopdb } from "../database/connection.js";

export async function listProducts(req, res) {
  try {
    const products = await burguershopdb
      .collection(COLLECTIONS.products)
      .find()
      .toArray();

    console.log(products);
    return res.send(products);
  } catch (err) {
    res.status(500).send("Erro no servidor");
  }
}
