import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { loadQuests } from "../store/quests/questsSlice";
import { Fab } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { paths } from "../constants/paths";
import ErrorBox from "../components/ErrorBox";
import { errorMessages } from "../constants/messages";
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
    return <ErrorBox message={`${questsError || errorMessages.default}`} />;
  }

  return (
    <>
      <div style={{ position: "relative", top: "2rem", right: "1rem" }}>
        <NavLink to={`${paths.QUESTS}${paths.CREATE}`}>
          <Fab color="primary" aria-label="create">
            <FaPlus />
          </Fab>
        </NavLink>
      </div>
      <QuestList questIds={questIds} />
    </>
  );
};

export default QuestListPage;
