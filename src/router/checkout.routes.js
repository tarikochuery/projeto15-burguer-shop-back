import { Router } from "express";
import { postCheckout } from "../controllers/CheckoutController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { checkoutSchema } from "../schema/checkoutSchema.js";

const checkoutRouts = Router();

checkoutRouts.post(
  "/checkout",
  validateToken,
  validateSchema(checkoutSchema),
  postCheckout
);

export { checkoutRouts };
