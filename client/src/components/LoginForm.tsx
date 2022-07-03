import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import styles from "./common-styles.module.scss";

interface FormValues {
  email: string;
  password: string;
}

const defaultData: FormValues = {
  email: "",
  password: "",
};

const LoginForm: FC = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: defaultData,
  });
  const handleFormSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <TextField
        {...register("email")}
        type="email"
        placeholder="example@gmail.com"
        label="Email"
        margin="normal"
      />
      <TextField
        {...register("password")}
        type="password"
        label="Password"
        margin="normal"
      />
      <Button
        type="submit"
        sx={{ marginTop: "1rem" }}
        variant="outlined"
        color="primary"
      >
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
