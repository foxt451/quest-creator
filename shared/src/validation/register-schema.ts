import * as yup from "yup";
import { RegisterUser } from "../types";
import { validationConstants } from "../constants";
import { SchemaOf } from "yup";
const userConstants = validationConstants.user;

// could be based on the schema for user in general, just adding password field
// but since registration is the only place where we create/modify users
// no need to separate concerns
export const registerSchema: SchemaOf<RegisterUser> = yup.object().shape({
  username: yup
    .string()
    .min(userConstants.username.MIN_LENGTH)
    .max(userConstants.username.MAX_LENGTH)
    .required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(userConstants.password.MIN_LENGTH)
    .max(userConstants.password.MAX_LENGTH)
    .required(),
});
