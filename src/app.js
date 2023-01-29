import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./router/user.routes.js";
import { cartRouter } from "./router/cart.routes.js";
import { prodRouts } from "./router/product.routes.js";
import { authRouter } from "./router/auth.routes.js";
import { checkoutRouts } from "./router/checkout.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use([userRouter, cartRouter, prodRouts, authRouter, checkoutRouts]);

const port = process.env.PORT || 5000;

app.listen(port);
