import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { updateQuest, selectQuestById } from "../store/quests/questsSlice";
import { paths } from "../constants/paths";
import { IQuest } from "../interfaces/IQuest";
import { EntityId } from "@reduxjs/toolkit";
import ErrorBox from "./ErrorBox";
import { errorMessages } from "../constants/messages";
import QuestForm, { FormValues } from "./QuestForm/QuestForm";
import { IQuestUpdate } from "../interfaces/IQuestUpdate";

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
      const questNew: IQuest = {
        ...quest,
        ...data,
      };

      const questRestricted: IQuestUpdate = {
        name: questNew.name,
        duration: questNew.duration,
        difficulty: questNew.difficulty,
        description: questNew.description,
        image: questNew.image
      };

      const updatedQuest = await dispatch(
        updateQuest({ id: questId, data: questRestricted })
      ).unwrap();
      navigate(`${paths.QUESTS}/${updatedQuest.id}`);
    } catch (e: any) {
      setError(e?.message ?? errorMessages.default);
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
