import { FC, useState } from "react";
import QuestUpdateForm from "../components/QuestUpdateForm";
import { useAppDispatch } from "../store/hooks";
import { pathParameters, paths } from "../constants/paths";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBox from "../components/ErrorBox";
import { QuestData } from "shared";
import { errorMessages } from "../constants/messages";
import { updateQuest } from "../store/quests/questsSlice";
import { useSelectQuest } from "../hooks/useSelectQuest";
import { ErrorState } from "../types/fetching/ErrorState";
import { SubmitHandler } from "react-hook-form";

const UpdateQuestPage: FC = () => {
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
  } else if (error) {
    questComponent = <ErrorBox message={`${error}`} />;
  } else if (!quest) {
    navigate(`${paths.QUESTS}`);
  } else if (questStatus === "loaded") {
    questComponent = (
      <QuestUpdateForm questData={quest} onSubmit={handleQuestSubmit} />
    );
  }
  return questComponent;
};

export default UpdateQuestPage;
