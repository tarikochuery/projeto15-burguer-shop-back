import {MongoClient} from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL)
let burguershopdb;
try {
    await mongoClient.connect()
    burguershopdb = mongoClient.db()
} catch (error) {
    console.log('Deu errro no server')
}

export {burguershopdb}
