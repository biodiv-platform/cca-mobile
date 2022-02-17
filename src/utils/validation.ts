import { FORM_TYPE } from "@static/constants";
import * as Yup from "yup";

export const generateValidationStatement = (field) => {
  let rule: any = Yup.mixed();

  switch (field.type) {
    case FORM_TYPE.TEXT:
      rule = Yup.string();
      break;

    case FORM_TYPE.NUMBER:
      rule = Yup.number().transform((value) => (isNaN(value) ? undefined : value));

      if (field.minMax?.[0]) {
        rule = rule.min(field.minMax?.[0]);
      }

      if (field.minMax?.[1]) {
        rule = rule.max(field.minMax?.[1]);
      }

      break;

    case FORM_TYPE.FILE:
      rule = Yup.array().nullable();
      break;

    default:
      rule = Yup.mixed().notRequired();
      break;
  }

  if (field.isRequired) {
    rule = rule.required();
  }

  return { ...field, rule };
};

export const buildValidationRules = (fields) => {
  const validation: any = [];

  fields.map((field) => {
    validation.push(generateValidationStatement(field));
    if (field.children.length) {
      validation.push(...buildValidationRules(field.children));
    }
  });

  return validation;
};
