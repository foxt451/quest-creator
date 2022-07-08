import { FC, useState } from "react";
import QuestUpdateForm from "../components/QuestUpdateForm";
import { useAppDispatch } from "../store/hooks";
import { pathParameters, paths } from "../constants/paths";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBox from "../components/ErrorBox";
import { QuestData } from "shared";
import { updateQuest } from "../store/quests/thunks";
import { useSelectQuest } from "../hooks/useSelectQuest";
import { ErrorState } from "../types/fetching/ErrorState";
import { SubmitHandler } from "react-hook-form";
import { getMessageOfCaughtError } from "../helpers/errors";

const UpdateQuestPage: FC = () => {
  const { [pathParameters.QUEST_ID]: questId = "" } = useParams();
  const { quest, questError, questStatus } = useSelectQuest(questId);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleQuestSubmit: SubmitHandler<QuestData> = async (data) => {
    const { name, description, difficulty, duration, image }: QuestData = data;
    setError(false);
    setLoading(true);
    try {
      const updatedQuest = await dispatch(
        updateQuest({
          id: questId,
          data: {
            name,
            description,
            difficulty,
            duration,
            image,
          },
        })
      ).unwrap();
      navigate(`${paths.QUESTS}/${updatedQuest.id}`);
    } catch (e: unknown) {
      setError(getMessageOfCaughtError(e));
    } finally {
      setLoading(false);
    }
  };

  let questComponent = null;
  if (questStatus === "loading" || questStatus === "initial" || loading)
    questComponent = <div>Loading...</div>;
  else if (questStatus === "failed") {
    questComponent = <ErrorBox message={`${questError}`} />;
  } else if (!quest) {
    navigate(`${paths.QUESTS}`);
  } else {
    questComponent = (
      <>
        {error && <ErrorBox message={`${error}`} />}
        <QuestUpdateForm questData={quest} onSubmit={handleQuestSubmit} />
      </>
    );
  }
  return questComponent;
};

export default UpdateQuestPage;
