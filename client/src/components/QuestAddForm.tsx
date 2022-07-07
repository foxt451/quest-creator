import React, { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import { questDifficulties } from "shared";
import QuestForm from "./QuestForm/QuestForm";
import { QuestData } from "shared";

const initialValues: QuestData = {
  name: "",
  duration: null,
  difficulty: questDifficulties.easy,
  description: "",
  image: null,
} as const;

const QuestAddForm: FC<{
  onSubmit: SubmitHandler<QuestData>;
}> = ({ onSubmit }) => {
  return <QuestForm initialValues={initialValues} onSubmit={onSubmit} />;
};

export default QuestAddForm;
