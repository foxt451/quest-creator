import React, { FC, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { QuestData } from "shared";
import ErrorBox from "../components/ErrorBox";
import QuestAddForm from "../components/QuestAddForm";
import { ErrorState } from "../types/fetching/ErrorState";
import { paths } from "../constants/paths";
import { useAppDispatch } from "../store/hooks";
import { addQuest } from "../store/quests/thunks";
import { getMessageOfCaughtError } from "../helpers/errors";

const AddQuestPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleQuestSubmit: SubmitHandler<QuestData> = async (data) => {
    setError(false);
    setLoading(true);
    try {
      const addedQuest = await dispatch(addQuest(data)).unwrap();
      navigate(`${paths.QUESTS}/${addedQuest.id}`);
    } catch (e: unknown) {
      setError(getMessageOfCaughtError(e));
    } finally {
      setLoading(false);
    }
  };

  let questComponent = null;
  if (loading) questComponent = <div>Loading...</div>;
  else {
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
