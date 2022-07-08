import { FC, ReactNode } from "react";
import QuestDetails from "../components/QuestDetails/QuestDetails";
import { pathParameters } from "../constants/paths";
import { useParams, Link } from "react-router-dom";
import { paths } from "../constants/paths";
import ErrorBox from "../components/ErrorBox";
import { errorMessages } from "../constants/messages";
import { useSelectQuest } from "../hooks/useSelectQuest";
import { Button } from "@mui/material";

// if the questId is in cache, renders momentarily, otherwise loads the quest
// and saves it to selected quest
const QuestDetailsPage: FC = () => {
  const { [pathParameters.QUEST_ID]: questId = "" } = useParams();
  const { questError, questStatus } = useSelectQuest(questId);

  let questComponent: ReactNode = null;
  if (questStatus === "loading" || questStatus === "initial")
    questComponent = <div>Loading...</div>;
  else if (questStatus === "failed") {
    questComponent = (
      <ErrorBox message={`${questError || errorMessages.default}`} />
    );
  } else {
    questComponent = <QuestDetails questId={questId} />;
  }
  return (
    <>
      {questComponent}
      <Link to={`${paths.QUESTS}`}>
        <Button>Back to all quests</Button>
      </Link>
    </>
  );
};

export default QuestDetailsPage;
