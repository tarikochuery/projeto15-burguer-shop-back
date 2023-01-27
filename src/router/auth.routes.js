import {Router} from "express"
import { authController } from "../controllers/authController.js"

const authRouter = Router()

authRouter.get("/verify", authController.verifyToken)

export {authRouter}