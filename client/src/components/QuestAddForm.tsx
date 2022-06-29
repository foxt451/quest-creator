import React, { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import QuestForm, { FormValues } from "./QuestForm/QuestForm";

const initialValues: FormValues = {
  name: "",
  duration: null,
  difficulty: "",
  description: "",
  image: null,
} as const;

const handleQuestSubmit: SubmitHandler<FormValues> = (data) => {
  console.log(data);
};

const QuestAddForm: FC = () => {
  return (
    <QuestForm initialValues={initialValues} onSubmit={handleQuestSubmit} />
  );
};

export default QuestAddForm;
