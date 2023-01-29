import joi from "joi";

export const checkoutSchema = joi.object({
  name: joi.string().required(),
  city: joi.string().required(),
  street: joi.string().required(),
  district: joi.string().required(),
  number: joi.string().required(),
  paymentForms: joi
    .string()
    .valid("Dinheiro", "Catão de credito", "Pix")
    .required(),
  value: joi.string().required(),
  orders: joi
    .array()
    .items(
      joi.object({
        product: joi.string().required(),
        amount: joi.string().required(),
      })
    )
    .required(),
});
