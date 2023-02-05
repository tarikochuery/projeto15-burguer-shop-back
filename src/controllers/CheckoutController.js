import COLLECTIONS from "../database/collections.js";
import { burguershopdb } from "../database/connection.js";
import { ObjectId } from "bson";


export const checkoutController = {

  async postCheckout(req, res) {
    const { userId } = res.locals;
    const { city, street, district, number, paymentForms, value, orders } =
      req.body;

    try {
      const user = await burguershopdb
        .collection(COLLECTIONS.users)
        .findOne({ _id: ObjectId(userId) });

      if (!user) {
        return res.status(409).send();
      }

      const date = new Date

      await burguershopdb.collection(COLLECTIONS.checkout).insertOne({
        userId,
        name: user.name,
        city,
        street,
        district,
        number,
        paymentForms,
        value,
        orders,
        date: date.toUTCString()
      });

      return res.status(201).send();
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  async getHistoryCheckout(req, res) {
    const { userId } = res.locals

    try {
      const user = await burguershopdb
        .collection(COLLECTIONS.users)
        .findOne({ _id: ObjectId(userId) });

      if (!user) {
        return res.status(409).send();
      }

      const history = await burguershopdb.collection(COLLECTIONS.checkout).find({ userId }).toArray()

      return res.status(200).send(history)
    } catch (error) {
      console.log(error)
      res.status(500).send()
    }
  }

} 