import { Router } from "express";
import cartController from "../controllers/cartController.js";
import { validateToken } from "../middlewares/validateToken.js";

export const cartRouter = Router();

cartRouter.use(validateToken);
cartRouter.post('/cart/:id', cartController.addToCartById);
cartRouter.get('/cart/', cartController.getCartItems);