import bcrypt from "bcrypt";
import COLLECTIONS from "../database/collections.js";
import { burguershopdb } from "../database/connection.js";


export const userController = {

    async createUser(req, res) {
        const { name, email, password } = req.body;

        const hashPassword = bcrypt.hashSync(password, 10);

        try {
            const user = await burguershopdb.collection(COLLECTIONS.users).findOne({ email })

            if(user){
                return res.status(409).send()
            }

            await burguershopdb.collection(COLLECTIONS.users).insertOne({ name, email, password: hashPassword, cart: [] });
            return res.status(201).send();
        } catch (error) {
            return res.status(500).send();
        }
    },
}; 