import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { loadQuests } from "../store/quests/questsSlice";
import ErrorBox from "../components/ErrorBox";
import QuestList from "../components/QuestList";

const QuestListPage: FC = () => {
  const dispatch = useAppDispatch();

  const questIds = useAppSelector((state) => state.quests.questsPage.ids);
  const questsStatus = useAppSelector(
    (state) => state.quests.questsPage.status
  );
  const questsError = useAppSelector((state) => state.quests.questsPage.error);

  useEffect(() => {
    if (questsStatus === "initial") {
      dispatch(loadQuests());
    }
  }, [dispatch, questsStatus]);

  if (questsStatus === "loading") return <div>Loading...</div>;
  if (questsStatus === "failed") {
    return <ErrorBox message={`Error: ${questsError || "please try again"}`} />;
  }

  return <QuestList questIds={questIds} />;
};

export default QuestListPage;
