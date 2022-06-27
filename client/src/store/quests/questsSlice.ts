import { IQuest } from "shared/interfaces/IQuest";
import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

export interface QuestsState {
  quests: IQuest[];
  selectedQuest: IQuest | null;
  error: string | null;
  status: "initial" | "loading" | "failed" | "loaded";
}

const initialState: QuestsState = {
  quests: [],
  status: "initial",
  selectedQuest: null,
  error: null,
};

export const questsSlice = createSlice({
  name: "quests",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

export const selectQuests = (state: RootState) => state.quests.quests;
export default questsSlice.reducer;
