import * as yup from "yup";
import { SchemaOf } from "yup";
import { LoginUser } from "../types";

export const loginSchema: SchemaOf<LoginUser> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();
