import React, { FC, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { QuestData } from "shared";
import ErrorBox from "../components/ErrorBox";
import QuestAddForm from "../components/QuestAddForm";
import { ErrorState } from "../types/fetching/ErrorState";
import { pathParameters, paths } from "../constants/paths";
import { useSelectQuest } from "../hooks/useSelectQuest";
import { useAppDispatch } from "../store/hooks";
import { updateQuest } from "../store/quests/questsSlice";
import { errorMessages } from "../constants/messages";

const AddQuestPage: FC = () => {
  const { [pathParameters.QUEST_ID]: questId = "" } = useParams();
  const { quest, questError, questStatus } = useSelectQuest(questId);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleQuestSubmit: SubmitHandler<QuestData> = async (data) => {
    setError(false);
    setLoading(true);
    try {
      const updatedQuest = await dispatch(
        updateQuest({ id: questId, data })
      ).unwrap();
      navigate(`${paths.QUESTS}/${updatedQuest.id}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : errorMessages.default);
    } finally {
      setLoading(false);
    }
  };

  let questComponent = null;
  if (questStatus === "loading" || loading)
    questComponent = <div>Loading...</div>;
  else if (questStatus === "failed") {
    questComponent = <ErrorBox message={`${questError}`} />;
  } else if (!quest) {
    navigate(`${paths.QUESTS}`);
  } else if (questStatus === "loaded") {
    questComponent = (
      <>
        {error && <ErrorBox message={`${error}`} />}
        <QuestAddForm onSubmit={handleQuestSubmit} />
      </>
    );
  }
  return questComponent;
};

export default AddQuestPage;
