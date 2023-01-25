import { Router } from "express";
import { listProducts } from "../controllers/productsController.js";

const prodRouts = Router();

prodRouts.get("/products", listProducts);

export { prodRouts };
