import React, { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import { QuestData } from "shared";
import QuestForm from "./QuestForm/QuestForm";

const QuestUpdateForm: FC<{
  questData: QuestData;
  onSubmit: SubmitHandler<QuestData>;
}> = ({ questData, onSubmit }) => {
  return (
      <QuestForm initialValues={questData} onSubmit={onSubmit} />
  );
};

export default QuestUpdateForm;
