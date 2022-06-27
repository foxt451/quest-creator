import React, { FC } from "react";
import queryNames from "../constants/QueryNames";
import { IQuest } from "shared/interfaces/IQuest";
import useGQLFetch from "../hooks/useGQLFetch";
import ErrorBox from "../components/ErrorBox";
import QuestList from "../components/QuestList";

const QUESTS_QUERY = `
  query ${queryNames.QUESTS} {
    quests {
      id,
      name,
      description,
      image,
      difficulty,
      duration
    }
  }
`;

const QuestListPage: FC = () => {
  const { data, loading, error } = useGQLFetch({ query: QUESTS_QUERY }, []);

  if (loading) return <div>Loading...</div>;
  if (error) {
    return (
      <ErrorBox message={`Error: ${error?.message || "please try again"}`} />
    );
  }
  return <QuestList quests={data.quests} />;
};

export default QuestListPage;
