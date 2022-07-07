import React, { FC } from "react";
import SignupForm from "../components/SignupForm";
import ErrorBox from "../components/ErrorBox";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "shared";
import { useAppDispatch } from "../store/hooks";
import { errorMessages } from "../constants/messages";
import { register as registerAction } from "../store/profile/profileSlice";

const SignupPage: FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | false>(false);

  const handleFormSubmit = async (data: RegisterUser) => {
    setLoading(true);
    try {
      await dispatch(registerAction(data)).unwrap();
      navigate("/");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : errorMessages.default);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <>Loading...</>;
  }

  const dispatch = useAppDispatch();
  return (
    <>
      {error && <ErrorBox message={error} />}
      <SignupForm submitHandler={handleFormSubmit} />
    </>
  );
};

export default SignupPage;
