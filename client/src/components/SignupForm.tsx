import React, { FC } from "react";
import { useForm } from "react-hook-form";
import ErrorBox from "./ErrorBox";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { register as registerAction } from "../store/profile/profileSlice";
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
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | false>(false);

  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: defaultData,
  });
  const handleFormSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await dispatch(registerAction(data)).unwrap();
      navigate("/");
    } catch (e: any) {
      setError(e?.message ?? "Unknown error. Try again");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <>Loading...</>;
  }
  return (
    <>
      {error && <ErrorBox message={error} />}
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
    </>
  );
};

export default SignupForm;
