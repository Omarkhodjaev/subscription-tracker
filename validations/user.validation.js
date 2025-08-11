import Joi from "joi";

export const signUpUserValidation = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().min(6).max(255).email().required(),
  password: Joi.string().min(6).max(255).required(),
});

export const signInUserValidation = Joi.object({
  email: Joi.string().min(6).max(255).email().required(),
  password: Joi.string().min(6).max(255).required(),
});

export const updateUserValidation = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().min(6).max(255).email().optional(),
  password: Joi.string().min(6).max(255).optional(),
});
