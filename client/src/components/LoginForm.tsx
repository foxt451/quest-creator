import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./common-styles/form-styles.module.scss";
import { LoginUser, loginSchema } from "shared";

const defaultData: LoginUser = {
  email: "",
  password: "",
};

const LoginForm: FC<{
  submitHandler: SubmitHandler<LoginUser>;
}> = ({ submitHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    defaultValues: defaultData,
    resolver: yupResolver(loginSchema),
  });

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
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
        <Button type="submit" variant="outlined" color="primary">
          Log in
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
