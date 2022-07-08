import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";
import { RegisterUser } from "shared";
import { SchemaOf } from "yup";
import * as yup from "yup";
import { registerSchema as registerSchemaCommon } from "shared";

import styles from "./common-styles/form-styles.module.scss";

interface FormValues extends RegisterUser {
  repeatPassword: string;
}

const registerSchema: SchemaOf<FormValues> = registerSchemaCommon.shape({
  repeatPassword: yup
    .string()
    .required("please, confirm your password")
    .oneOf([yup.ref("password")], "passwords must match"),
});

const defaultData: FormValues = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const SignupForm: FC<{
  submitHandler: SubmitHandler<RegisterUser>;
}> = ({ submitHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultData,
    resolver: yupResolver(registerSchema),
  });
  const onFormSubmit: SubmitHandler<FormValues> = (data) => {
    const { username, email, password }: RegisterUser = data;
    submitHandler({ username, email, password });
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
      <TextField
        {...register("username")}
        type="text"
        label="Username"
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
      />
      <TextField
        {...register("email")}
        type="email"
        placeholder="example@gmail.com"
        label="Email"
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />
      <TextField
        {...register("password")}
        type="password"
        label="Password"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />
      <TextField
        {...register("repeatPassword")}
        type="password"
        label="Repeat Password"
        error={Boolean(errors.repeatPassword)}
        helperText={errors.repeatPassword?.message}
      />
      <Button type="submit" variant="outlined" color="primary">
        Sign up
      </Button>
    </form>
  );
};

export default SignupForm;
