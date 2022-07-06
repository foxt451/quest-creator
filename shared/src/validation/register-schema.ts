import yup, { SchemaOf } from "yup";
import { IRegisterUser } from "../types";
import { validationConstants } from "./constants";
const userConstants = validationConstants.user;

export const registerSchema: SchemaOf<IRegisterUser> = yup.object().shape({
  username: yup.string().min(userConstants.username.MIN_LENGTH).required(),
  email: yup.string().email().required(),
  password: yup.string().min(userConstants.password.MIN_LENGTH).required(),
});
