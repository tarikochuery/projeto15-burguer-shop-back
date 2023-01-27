import express from "express";
import cors from "cors";
import { userRouter } from "./router/user.routes.js";
import { cartRouter } from "./router/cart.routes.js";
import { prodRouts } from "./router/product.routes.js";
import { authRouter } from "./router/auth.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use([userRouter, cartRouter, prodRouts, authRouter]);

app.listen(5000);
