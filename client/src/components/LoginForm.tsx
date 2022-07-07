import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import styles from "./common-styles/form-styles.module.scss";
import { LoginUser } from "shared";

const defaultData: LoginUser = {
  email: "",
  password: "",
};

const LoginForm: FC<{
  submitHandler: SubmitHandler<LoginUser>;
}> = ({ submitHandler }) => {
  const { register, handleSubmit } = useForm<LoginUser>({
    defaultValues: defaultData,
  });
  
  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <TextField
          {...register("email")}
          type="email"
          placeholder="example@gmail.com"
          label="Email"
        />
        <TextField
          {...register("password")}
          type="password"
          label="Password"
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
        >
          Log in
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
