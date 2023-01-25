import { burguershopdb } from "../database/connection.js";
import COLLECTIONS from '../database/collections.js';
import { ObjectId } from "bson";

const cartController = {
  async addToCartById(req, res) {
    const { id } = req.params;
    const { email } = req.headers;

    const product = await burguershopdb.collection(COLLECTIONS.products).findOne({ _id: ObjectId(id) });
    console.log(product);
    if (!product) return res.status(404).send('Produto não encontrado');

    const user = await burguershopdb.collection(COLLECTIONS.users).findOne({ email });
    if (!user) return res.sendStatus(401);

    const { cart } = user;
    cart.push(product);

    await burguershopdb.collection(COLLECTIONS.users)
      .updateOne({ email }, {
        $set: { cart }
      });

    return res.sendStatus(201);
  }
};

export default cartController;