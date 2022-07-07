import { EntityId } from "@reduxjs/toolkit";
import { Quest } from "../types/models/Quest";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  designateAsSelected,
  LoadingStatus,
  loadQuest,
  selectQuestById,
} from "../store/quests/questsSlice";
import { ErrorState } from "../types/fetching/ErrorState";

export const useSelectQuest = (
  questId: EntityId
): {
  questStatus: LoadingStatus;
  questError: ErrorState;
  quest: Quest | undefined;
} => {
  const dispatch = useAppDispatch();
  const [designated, setDesignated] = useState(false);
  const quest = useAppSelector((state) => selectQuestById(state, questId));

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

  return { questStatus, questError, quest };
};
