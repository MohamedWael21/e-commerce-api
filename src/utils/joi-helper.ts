import Joi from "joi";

const formatValidationErrors = (errors: Joi.ValidationErrorItem[]) => {
  const messages: { [key: string]: string }[] = [];

  errors.forEach((error) => {
    const path = error.path[0] || "error";
    messages.push({ [path]: error.message.replace(/"/g, "") });
  });

  return messages;
};

export default formatValidationErrors;
