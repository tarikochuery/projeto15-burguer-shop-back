import { Router } from "express";
import cartController from "../controllers/cartController.js";
import { validateToken } from "../middlewares/validateToken.js";

export const cartRouter = Router();

cartRouter.post('/cart/:id', validateToken, cartController.addToCartById);
cartRouter.get('/cart/', validateToken, cartController.getCartItems);
cartRouter.delete('/cart', validateToken, cartController.deleteAllProducts);
cartRouter.delete('/cart/:id', validateToken, cartController.deleteProductById);

