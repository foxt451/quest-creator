import * as yup from "yup";
import { validationConstants } from "../constants";
import { QuestData } from "../types";
import { SchemaOf } from "yup";
import { questDifficulties } from "../enums";
const questuserConstants = validationConstants.quest;

export const questSchema: SchemaOf<QuestData> = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^[a-z0-9]+$/i, { message: "Title must be alphanumeric" })
      .required()
      .max(questuserConstants.name.MAX_LENGTH)
      .min(questuserConstants.name.MIN_LENGTH)
      .trim(),
    description: yup
      .string()
      .default("")
      .max(questuserConstants.description.MAX_LENGTH)
      .min(questuserConstants.description.MIN_LENGTH)
      .trim(),
    difficulty: yup.string().oneOf(Object.values(questDifficulties)).required(),
    image: yup.string().url().defined().nullable(true),
    duration: yup.number().positive().defined().nullable(true),
  })
  .required();
