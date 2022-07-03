import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import styles from "./common-styles.module.scss";

interface FormValues {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const defaultData: FormValues = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const SignupForm: FC = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: defaultData,
  });
  const handleFormSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <TextField
        {...register("username")}
        type="text"
        label="Username"
        margin="normal"
      />
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
      <TextField
        {...register("repeatPassword")}
        type="password"
        label="Repeat Password"
        margin="normal"
      />
      <Button
        type="submit"
        sx={{ marginTop: "1rem" }}
        variant="outlined"
        color="primary"
      >
        Sign up
      </Button>
    </form>
  );
};

export default SignupForm;
