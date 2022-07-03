import React, { FC } from "react";
import { useForm } from "react-hook-form";
import ErrorBox from "./ErrorBox";
import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/profile/profileSlice";
import styles from "./common-styles.module.scss";
import { ILoginUser } from "shared";

const defaultData: ILoginUser = {
  email: "",
  password: "",
};

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | false>(false);

  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<ILoginUser>({
    defaultValues: defaultData,
  });
  const handleFormSubmit = async (data: ILoginUser) => {
    setLoading(true);
    try {
      await dispatch(login(data)).unwrap();
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
    </>
  );
};

export default LoginForm;
