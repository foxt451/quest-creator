import React, { FC, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { addQuest } from "../store/quests/questsSlice";
import { paths } from "../constants/paths";
import { questDifficulties } from "shared";
import ErrorBox from "./ErrorBox";
import QuestForm, { FormValues } from "./QuestForm/QuestForm";

const initialValues: FormValues = {
  name: "",
  duration: null,
  difficulty: questDifficulties.easy,
  description: "",
  image: null,
} as const;

const QuestAddForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | false>(false);
  const handleQuestSubmit: SubmitHandler<FormValues> = async (data) => {
    setError(false);
    setLoading(true);
    try {
      const quest = await dispatch(addQuest(data)).unwrap();
      navigate(`${paths.QUESTS}/${quest.id}`);
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
      <QuestForm initialValues={initialValues} onSubmit={handleQuestSubmit} />
    </>
  );
};

export default QuestAddForm;
