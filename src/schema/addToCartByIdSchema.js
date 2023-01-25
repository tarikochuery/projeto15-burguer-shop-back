import Joi from "joi";

export const addToCartByIdSchema = Joi.string().email().required();