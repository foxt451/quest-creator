import { FC, useEffect, useState } from "react";
import QuestUpdateForm from "../components/QuestUpdateForm";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { pathParameters } from "../constants/paths";
import { useParams } from "react-router-dom";
import ErrorBox from "../components/ErrorBox";
import { loadQuest, designateAsSelected } from "../store/quests/questsSlice";

const UpdateQuestPage: FC = () => {
  const dispatch = useAppDispatch();
  const [designated, setDesignated] = useState(false);

  const { [pathParameters.QUEST_ID]: questId = "" } = useParams();
  useEffect(() => {
    setDesignated(true);
    dispatch(designateAsSelected(questId));
  }, [dispatch, questId]);
  const questStatus = useAppSelector(
    (state) => state.quests.selectedQuest.status
  );

  const questError = useAppSelector(
    (state) => state.quests.selectedQuest.error
  );

  useEffect(() => {
    if (!designated) {
      return;
    }
    if (questStatus === "initial") {
      dispatch(loadQuest(questId));
    }
  }, [dispatch, questStatus, questId, designated]);
  let questComponent = null;
  if (questStatus === "loading") questComponent = <div>Loading...</div>;
  else if (questStatus === "failed") {
    questComponent = (
      <ErrorBox message={`Error: ${questError || "please try again"}`} />
    );
  } else if (questStatus === "loaded") {
    questComponent = <QuestUpdateForm questId={questId} />;
  }
  return questComponent;
};

export default UpdateQuestPage;
