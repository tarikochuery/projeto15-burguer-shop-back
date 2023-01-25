import bcrypt from "bcrypt";
import { burguershopdb } from "../database/connection.js";


export const userController = {

    async createUser(req, res) {
        const { name, email, password } = req.body;

        const hashPassword = bcrypt.hashSync(password, 10);

        try {
            await burguershopdb.collection("users").insertOne({ name, email, password: hashPassword, cart: [] });
            return res.status(201).send();
        } catch (error) {
            return res.status(500).send();
        }
    },
}; 