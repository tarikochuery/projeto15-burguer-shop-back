import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import COLLECTIONS from "../database/collections.js";
import { burguershopdb } from "../database/connection.js";

dotenv.config()

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
    
    async loginUser(req, res){
        const {email, password} = req.body

        try {
            const user = await burguershopdb.collection(COLLECTIONS.users).findOne({email})

            if(!user){
                return res.status(404).send()
            }
            console.log(user)
            const isCorrectPassword = bcrypt.compareSync(password, user.password)
            if(!isCorrectPassword){
                return res.status(409).send()
            }
            
            let token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: "3h"})
            return res.send({token, id: user._id})
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
    }
}; 