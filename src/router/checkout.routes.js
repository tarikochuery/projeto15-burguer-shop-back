import { Router } from "express";
import { checkoutController } from "../controllers/CheckoutController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { checkoutSchema } from "../schema/checkoutSchema.js";

const checkoutRouts = Router();

checkoutRouts.post(
  "/checkout",
  validateToken,
  validateSchema(checkoutSchema),
  checkoutController.postCheckout
);
checkoutRouts.get("/checkout", validateToken, checkoutController.getHistoryCheckout)

export { checkoutRouts };
