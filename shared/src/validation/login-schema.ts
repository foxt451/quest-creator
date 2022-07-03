import yup, { SchemaOf } from "yup";
import { ILoginUser } from "../interfaces";
import { validationConstants } from "./constants";
const userConstants = validationConstants.user;

export const registerSchema: SchemaOf<ILoginUser> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(userConstants.password.MIN_LENGTH).required(),
});
