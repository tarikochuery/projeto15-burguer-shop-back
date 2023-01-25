import { Router } from "express";
import cartController from "../controllers/cartController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { addToCartByIdSchema } from "../schema/addToCartByIdSchema.js";

export const cartRouter = Router();

cartRouter.post('/cart/:id', cartController.addToCartById);