import { Quest } from "../../types/models/Quest";
import { RootState } from "../store";
import { ErrorState } from "../../types/fetching/ErrorState";
import { LoadingStatus } from "../../types/fetching/LoadingStatus";
import {
  addQuest,
  deleteQuest,
  loadQuest,
  loadQuests,
  updateQuest,
} from "./thunks";
import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  EntityId,
} from "@reduxjs/toolkit";
import {} from "./thunks";

const questsAdapter = createEntityAdapter<Quest>({
  sortComparer: (a, b) =>
    a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0,
});

export interface QuestsAdditionalState {
  questsPage: { ids: EntityId[]; status: LoadingStatus; error: ErrorState };
  selectedQuest: {
    id: EntityId | null;
    status: LoadingStatus;
    error: ErrorState;
  };
}

const initialState = questsAdapter.getInitialState<QuestsAdditionalState>({
  questsPage: {
    ids: [],
    status: "initial",
    error: false,
  },
  selectedQuest: {
    id: null,
    status: "initial",
    error: false,
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
        state.selectedQuest.error = false;
        return;
      }
      state.selectedQuest.error = false;
      state.selectedQuest.status = "initial";
    },
  },
  extraReducers(builder) {
    builder.addCase(loadQuests.pending, (state) => {
      state.questsPage.status = "loading";
    });
    builder.addCase(
      loadQuests.fulfilled,
      (state, action: PayloadAction<Quest[]>) => {
        questsAdapter.upsertMany(state, action.payload);
        state.questsPage.ids = action.payload.map((quest) => quest.id);
        state.questsPage.status = "loaded";
      }
    );
    builder.addCase(loadQuests.rejected, (state, action) => {
      state.questsPage.error = action.error.message ?? false;
      state.questsPage.status = "failed";
    });

    builder.addCase(loadQuest.pending, (state) => {
      state.selectedQuest.status = "loading";
    });
    builder.addCase(
      loadQuest.fulfilled,
      (state, action: PayloadAction<Quest>) => {
        questsAdapter.upsertOne(state, action.payload);
        state.selectedQuest.status = "loaded";
      }
    );
    builder.addCase(loadQuest.rejected, (state, action) => {
      state.selectedQuest.error = action.error.message ?? false;
      state.selectedQuest.status = "failed";
    });

    builder.addCase(
      addQuest.fulfilled,
      (state, action: PayloadAction<Quest>) => {
        questsAdapter.upsertOne(state, action.payload);
        state.questsPage = {
          error: false,
          ids: [],
          status: "initial",
        };
      }
    );

    builder.addCase(
      updateQuest.fulfilled,
      (state, action: PayloadAction<Quest>) => {
        questsAdapter.upsertOne(state, action.payload);
      }
    );

    builder.addCase(
      deleteQuest.fulfilled,
      (state, action: PayloadAction<EntityId>) => {
        questsAdapter.removeOne(state, action.payload);
        state.questsPage.ids = state.questsPage.ids.filter(
          (id) => id !== action.payload
        );
        state.selectedQuest.id = null;
      }
    );
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
