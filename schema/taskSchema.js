import Joi from "joi";

export const taskSchema = Joi.object({
  // title: Joi.string().required().min(5).max(30),
  title: Joi.string().required(),
  description: Joi.string().max(150),
});

export const updateTaskSchema = Joi.object({
  // title: Joi.string().max(5).max(30),
  title: Joi.string(),
  description: Joi.string().max(150),
});
