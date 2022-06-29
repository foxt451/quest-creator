import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectQuests, loadQuests } from "../store/quests/questsSlice";
import ErrorBox from "../components/ErrorBox";
import QuestList from "../components/QuestList";

const QuestListPage: FC = () => {
  const dispatch = useAppDispatch();

  const quests = useAppSelector(selectQuests);
  const questsStatus = useAppSelector((state) => state.quests.status);
  const questsError = useAppSelector((state) => state.quests.error);

  useEffect(() => {
    if (questsStatus === "initial") {
      dispatch(loadQuests());
    }
  }, [dispatch, questsStatus]);

  if (questsStatus === "loading") return <div>Loading...</div>;
  if (questsStatus === "failed") {
    return <ErrorBox message={`Error: ${questsError || "please try again"}`} />;
  }

  return <QuestList quests={quests} />;
};

export default QuestListPage;
