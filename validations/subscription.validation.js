import Joi from "joi";

export const createSubscriptionValidation = Joi.object({
  name: Joi.string().max(250).required(),
  price: Joi.number().required(),
  currency: Joi.string().valid("USD", "EUR", "GBP").required(),
  frequency: Joi.string()
    .valid("daily", "weekly", "monthly", "yearly")
    .required(),
  category: Joi.string()
    .valid("sports", "entertainment", "education", "health", "other")
    .required(),
  paymentMethod: Joi.string().required(),
  status: Joi.string().valid("active", "expired", "cancelled"),
  startDate: Joi.date().required(),
});

export const updateSubscriptionValidation = Joi.object({
  name: Joi.string().max(250).optional(),
  price: Joi.number().optional(),
  currency: Joi.string().valid("USD", "EUR", "GBP").optional(),
  frequency: Joi.string()
    .valid("daily", "weekly", "monthly", "yearly")
    .optional(),
  category: Joi.string()
    .valid("sports", "entertainment", "education", "health", "other")
    .optional(),
  paymentMethod: Joi.string().optional(),
  status: Joi.string().valid("active", "expired", "cancelled"),
  startDate: Joi.date().optional(),
});
