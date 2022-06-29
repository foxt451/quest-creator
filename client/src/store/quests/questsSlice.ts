import { IQuest } from "shared";
import { RootState } from "../store";
import queryNames from "../../constants/queryNames";
import axios from "axios";
import { apiUrl } from "../../env/env";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
export const loadQuests = createAsyncThunk("quests/loadPosts", async () => {
  const response = await axios.post(apiUrl, {
    query: QUESTS_QUERY,
    variables: {},
  });
  return response.data.data.quests;
});

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
  extraReducers(builder) {
    builder.addCase(loadQuests.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loadQuests.fulfilled, (state, action) => {
      state.quests = action.payload;
      state.status = "loaded";
    });
    builder.addCase(loadQuests.rejected, (state, action) => {
      state.error = action.error.message ?? null;
      state.status = "failed";
    });
  },
});

export const selectQuests = (state: RootState) => state.quests.quests;
export default questsSlice.reducer;
