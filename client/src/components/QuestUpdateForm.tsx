import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { updateQuest, selectQuestById } from "../store/quests/questsSlice";
import { paths } from "../constants/paths";
import { EntityId } from "@reduxjs/toolkit";
import ErrorBox from "./ErrorBox";
import QuestForm, { FormValues } from "./QuestForm/QuestForm";

const QuestUpdateForm: FC<{ questId: EntityId }> = ({ questId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const quest = useAppSelector((state) => selectQuestById(state, questId));

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | false>(false);

  if (!quest) {
    return null;
  }
  const handleQuestSubmit: SubmitHandler<FormValues> = async (data) => {
    setError(false);
    setLoading(true);
    try {
      const updatedQuest = await dispatch(
        updateQuest({
          id: quest.id,
          data,
        })
      ).unwrap();
      navigate(`${paths.QUESTS}/${updatedQuest.id}`);
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
      <QuestForm initialValues={quest} onSubmit={handleQuestSubmit} />
    </>
  );
};

export default QuestUpdateForm;
