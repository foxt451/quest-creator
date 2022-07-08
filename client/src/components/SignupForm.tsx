import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { RegisterUser } from "shared";

import styles from "./common-styles/form-styles.module.scss";

interface FormValues extends RegisterUser {
  repeatPassword: string;
}

const defaultData: FormValues = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const SignupForm: FC<{
  submitHandler: SubmitHandler<RegisterUser>;
}> = ({ submitHandler }) => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: defaultData,
  });
  const onFormSubmit: SubmitHandler<FormValues> = (data) => {
    const { username, email, password }: RegisterUser = data;
    submitHandler({ username, email, password });
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
      <TextField {...register("username")} type="text" label="Username" />
      <TextField
        {...register("email")}
        type="email"
        placeholder="example@gmail.com"
        label="Email"
      />
      <TextField {...register("password")} type="password" label="Password" />
      <TextField
        {...register("repeatPassword")}
        type="password"
        label="Repeat Password"
      />
      <Button type="submit" variant="outlined" color="primary">
        Sign up
      </Button>
    </form>
  );
};

export default SignupForm;
