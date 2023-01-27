import { burguershopdb } from "../database/connection.js";
import COLLECTIONS from '../database/collections.js';
import { ObjectId } from "bson";

const cartController = {
  async addToCartById(req, res) {
    const { id } = req.params;
    const { userId } = res.locals;

    const product = await burguershopdb.collection(COLLECTIONS.products).findOne({ _id: ObjectId(id) });
    if (!product) return res.status(404).send('Produto não encontrado');

    const user = await burguershopdb.collection(COLLECTIONS.users).findOne({ _id: ObjectId(userId) });
    if (!user) return res.sendStatus(401);

    const { cart } = user;
    cart.push(product);

    await burguershopdb.collection(COLLECTIONS.users)
      .updateOne({ _id: ObjectId(userId) }, {
        $set: { cart }
      });

    return res.sendStatus(201);
  },

  async getCartItems(req, res) {
    const { userId } = res.locals;

    try {
      const user = await burguershopdb.collection(COLLECTIONS.users).findOne({ _id: ObjectId(userId) });
      if (!user) return res.sendStatus(401);

      res.send(user.cart);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  async deleteAllProducts(req, res) {
    const { userId } = res.locals;
    console.log(userId);
    try {
      const user = await burguershopdb
        .collection(COLLECTIONS.users)
        .findOne({ _id: ObjectId(userId) });

      if (!user) return res.sendStatus(401);

      await burguershopdb
        .collection(COLLECTIONS.users)
        .updateOne(
          {
            _id: ObjectId(userId)
          },
          {
            $set: { cart: [] }
          }
        );

      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
};

export default cartController;