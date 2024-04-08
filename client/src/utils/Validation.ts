import joi from "joi";
import { TaskPriority } from "../data/TaskPriority";

export const validator = (schema: joi.ObjectSchema) => (payload: any) => {
  const { error } = schema.validate(payload, { abortEarly: false });
  const errors = error?.details.map((error) => ({
    key: error.context?.key,
    message: error.message,
  }));
  return errors;
};

export const addTaskSchema = joi.object({
  name: joi.string().required().min(2).max(20).messages({
    "string.empty": `"Name" cannot be an empty field`,
    "string.min": `"Name" should have a minimum length of {#limit}`,
    "string.max": `"Name" should have a maximum length of {#limit}`,
    "any.required": `"Name" is a required field`,
  }),
  description: joi.string().required().min(2).max(150).messages({
    "string.empty": `"Description" cannot be an empty field`,
    "string.min": `"Description" should have a minimum length of {#limit}`,
    "string.max": `"Description" should have a maximum length of {#limit}`,
    "any.required": `"Description" is a required field`,
  }),
  dueDate: joi.date().required().messages({
    "any.required": `"Date" is a required field`,
  }),
  priority: joi
    .number()
    .required()
    .valid(...Object.values(TaskPriority))
    .messages({
      "string.empty": `"Priority" cannot be an empty field`,
      "any.required": `"Priority" is a required field`,
    }),
  listId: joi.number(),
});

export const updateTaskSchema = joi.object({
  name: joi.string().min(2).max(20).messages({
    "string.empty": `"Name" cannot be an empty field`,
    "string.min": `"Name" should have a minimum length of {#limit}`,
    "string.max": `"Name" should have a maximum length of {#limit}`,
  }),
  description: joi.string().min(2).max(150).messages({
    "string.empty": `"Description" cannot be an empty field`,
    "string.min": `"Description" should have a minimum length of {#limit}`,
    "string.max": `"Description" should have a maximum length of {#limit}`,
  }),
  dueDate: joi.date(),
  priority: joi
    .number()
    .valid(...Object.values(TaskPriority))
    .messages({
      "string.empty": `"Priority" cannot be an empty field`,
      "any.required": `"Priority" is a required field`,
    }),
  listId: joi.number(),
});

export const addTaskListSchema = joi.object({
  boardId: joi.number().required(),
  name: joi.string().required().messages({
    "string.empty": `"Name" cannot be an empty field`,
    "any.required": `{{#label}} is a required field`,
  }),
});

export const updateTaskListSchema = joi.object({
  name: joi.string().messages({
    "string.empty": `"Name" cannot be an empty field`,
    "any.required": `"Name" is a required field`,
  }),
});

export const createBoardSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": `"Name" cannot be an empty field`,
    "any.required": `"Name" is a required field`,
  }),
});

export const updateBoardSchema = joi.object({
  name: joi.string().messages({
    "string.empty": `"Name" cannot be an empty field`,
    "any.required": `"Name" is a required field`,
  }),
});
