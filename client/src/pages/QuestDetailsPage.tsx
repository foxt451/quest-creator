import { FC, ReactNode, useEffect, useState } from "react";
import QuestDetails from "../components/QuestDetails/QuestDetails";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { pathParameters } from "../constants/paths";
import { useParams, NavLink } from "react-router-dom";
import { paths } from "../constants/paths";
import ErrorBox from "../components/ErrorBox";
import { errorMessages } from "../constants/messages";
import { loadQuest, designateAsSelected } from "../store/quests/questsSlice";

// if the questId is in cache, renders momentarily, otherwise loads the quest
// and saves it to selected quest
const QuestDetailsPage: FC = () => {
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
  let questComponent: ReactNode = null;
  if (questStatus === "loading") questComponent = <div>Loading...</div>;
  else if (questStatus === "failed") {
    questComponent = (
      <ErrorBox message={`${questError || errorMessages.default}`} />
    );
  } else if (questStatus === "loaded") {
    questComponent = <QuestDetails questId={questId} />;
  }
  return (
    <>
      {questComponent}
      <NavLink to={`${paths.QUESTS}`}>Back to all quests</NavLink>
    </>
  );
};

export default QuestDetailsPage;
