import { Router } from "express"
import { userController } from "../controllers/userController.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { createUserSchema } from "../schema/createUserSchema.js"

const userRouter = Router()

userRouter.post("/sign-up", validateSchema(createUserSchema),  userController.createUser)

export { userRouter }