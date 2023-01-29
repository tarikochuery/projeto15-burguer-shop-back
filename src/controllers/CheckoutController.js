import COLLECTIONS from "../database/collections.js";
import { burguershopdb } from "../database/connection.js";
import { ObjectId } from "bson";

export async function postCheckout(req, res) {
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

    await burguershopdb.collection(COLLECTIONS.checkout).insertOne({
      name: user.name,
      city,
      street,
      district,
      number,
      paymentForms,
      value,
      orders,
    });

    return res.status(201).send();
  } catch (error) {
    return res.status(500).send(error);
  }
}
