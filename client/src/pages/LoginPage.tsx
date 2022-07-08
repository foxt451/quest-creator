import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "shared";
import ErrorBox from "../components/ErrorBox";
import LoginForm from "../components/LoginForm";
import { errorMessages } from "../constants/messages";
import { getMessageOfCaughtError } from "../helpers/errors";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/profile/thunks";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | false>(false);

  const dispatch = useAppDispatch();

  const handleFormSubmit = async (data: LoginUser) => {
    setLoading(true);
    try {
      await dispatch(login(data)).unwrap();
      navigate("/");
    } catch (e: unknown) {
      setError(getMessageOfCaughtError(e));
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
      <LoginForm submitHandler={handleFormSubmit} />
    </>
  );
};

export default LoginPage;
