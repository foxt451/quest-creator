import { IQuest } from "../../interfaces/IQuest";
import { RootState } from "../store";
import queryNames from "../../constants/queryNames";
import axios from "axios";
import { apiUrl } from "../../env/env";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
  EntityId,
} from "@reduxjs/toolkit";

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

const questsAdapter = createEntityAdapter<IQuest>({
  sortComparer: (a, b) => a.createdAt - b.createdAt,
});

export const loadQuests = createAsyncThunk<IQuest[]>(
  "quests/loadQuests",
  async () => {
    const response = await axios.post(apiUrl, {
      query: QUESTS_QUERY,
      variables: {},
    });
    return response.data.data.quests;
  }
);

const QUEST_QUERY = `
  query ${queryNames.QUEST} ($id: ID!) {
    quest(id: $id) {
      id,
      name,
      description,
      image,
      difficulty,
      duration
    }
  }
`;

export const loadQuest = createAsyncThunk<IQuest, EntityId>(
  "quests/loadQuest",
  async (id: EntityId) => {
    const response = await axios.post(apiUrl, {
      query: QUEST_QUERY,
      variables: { id },
    });
    return response.data.data.quest;
  }
);

type LoadingStatus = "initial" | "loading" | "failed" | "loaded";

export interface QuestsAdditionalState {
  questsPage: { ids: EntityId[]; status: LoadingStatus; error: string | null };
  selectedQuest: {
    id: EntityId | null;
    status: LoadingStatus;
    error: string | null;
  };
}

const initialState = questsAdapter.getInitialState<QuestsAdditionalState>({
  questsPage: {
    ids: [],
    status: "initial",
    error: null,
  },
  selectedQuest: {
    id: null,
    status: "initial",
    error: null,
  },
});

export const questsSlice = createSlice({
  name: "quests",
  initialState,
  reducers: {
    designateAsSelected(state, action: PayloadAction<EntityId>) {
      if (
        state.selectedQuest.id === action.payload &&
        state.selectedQuest.status !== "failed"
      ) {
        return;
      }
      state.selectedQuest.id = action.payload;
      if (state.ids.includes(action.payload)) {
        state.selectedQuest.status = "loaded";
        state.selectedQuest.error = null;
        
        return;
      }
      state.selectedQuest.error = null;
      state.selectedQuest.status = "initial";
    },
  },
  extraReducers(builder) {
    builder.addCase(loadQuests.pending, (state) => {
      state.questsPage.status = "loading";
    });
    builder.addCase(
      loadQuests.fulfilled,
      (state, action: PayloadAction<IQuest[]>) => {
        questsAdapter.upsertMany(state, action.payload);
        state.questsPage.ids = action.payload.map((quest) => quest.id);
        state.questsPage.status = "loaded";
      }
    );
    builder.addCase(loadQuests.rejected, (state, action) => {
      state.questsPage.error = action.error.message ?? null;
      state.questsPage.status = "failed";
    });

    builder.addCase(loadQuest.pending, (state) => {
      state.selectedQuest.status = "loading";
    });
    builder.addCase(
      loadQuest.fulfilled,
      (state, action: PayloadAction<IQuest>) => {
        questsAdapter.upsertOne(state, action.payload);
        state.selectedQuest.status = "loaded";
      }
    );
    builder.addCase(loadQuest.rejected, (state, action) => {
      state.selectedQuest.error = action.error.message ?? null;
      state.selectedQuest.status = "failed";
    });
  },
});

export const {
  selectAll: selectAllQuests,
  selectById: selectQuestById,
  selectIds: selectQuestIds,
  // Pass in a selector that returns the posts slice of state
} = questsAdapter.getSelectors<RootState>((state) => state.quests);
export const { designateAsSelected } = questsSlice.actions;
export default questsSlice.reducer;
