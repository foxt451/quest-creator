import { IQuest } from "../../interfaces/IQuest";
import { IQuestUpdate } from "../../interfaces/IQuestUpdate";
import { RootState } from "../store";
import { queryNames } from "../../constants/graphql";
import { inputTypeNames, endpointNames } from "shared";
import { request } from "../../services/graphql";
import { apiUrl } from "../../env/env";
import { FormValues } from "../../components/QuestForm/QuestForm";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
  EntityId,
} from "@reduxjs/toolkit";

const questsAdapter = createEntityAdapter<IQuest>({
  sortComparer: (a, b) =>
    a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0,
});

const QUESTS_QUERY = `
  query ${queryNames.QUESTS} {
    ${endpointNames.quests.all} {
      id,
      name,
      description,
      image,
      difficulty,
      duration,
      createdAt,
      updatedAt,
      userId
    }
  }
`;

export const loadQuests = createAsyncThunk<IQuest[]>(
  "quests/loadQuests",
  async () => {
    const response = await request(apiUrl, {
      query: QUESTS_QUERY,
      variables: {},
    });
    return response.data.data[endpointNames.quests.all];
  }
);

const QUEST_QUERY = `
  query ${queryNames.QUEST} ($id: ID!) {
    ${endpointNames.quests.one}(id: $id) {
      id,
      name,
      description,
      image,
      difficulty,
      duration,
      createdAt,
      updatedAt,
      userId
    }
  }
`;

export const loadQuest = createAsyncThunk<IQuest, EntityId>(
  "quests/loadQuest",
  async (id: EntityId) => {
    const response = await request(apiUrl, {
      query: QUEST_QUERY,
      variables: { id },
    });
    return response.data.data[endpointNames.quests.one];
  }
);

// const QUEST_DATA_INPUT_TYPE = `
// input QuestData {
//     name: String!,
//     duration: Int,
//     difficulty: QuestDifficulty!,
//     description: String!,
//     image: String
// }
// `;

const QUEST_ADD_QUERY = `
  mutation ${queryNames.ADD_QUEST} ($data: ${inputTypeNames.QUEST_DATA}!) {
    ${endpointNames.quests.add}(data: $data) {
      id,
      name,
      description,
      image,
      difficulty,
      duration,
      createdAt,
      updatedAt,
      userId
    }
  }
`;

export const addQuest = createAsyncThunk<IQuest, FormValues>(
  "quests/addQuest",
  async (values) => {
    const response = await request(apiUrl, {
      query: QUEST_ADD_QUERY,
      variables: { data: values },
    });

    return response.data.data[endpointNames.quests.add];
  }
);

const QUEST_UPDATE_QUERY = `
  mutation ${queryNames.UPDATE_QUEST} ($id: ID!, $data: ${inputTypeNames.QUEST_DATA}!) {
    ${endpointNames.quests.update}(id: $id, data: $data) {
      id,
      name,
      description,
      image,
      difficulty,
      duration,
      createdAt,
      updatedAt,
      userId
    }
  }
`;

export const updateQuest = createAsyncThunk<
  IQuest,
  { id: EntityId; data: IQuestUpdate }
>("quests/updateQuest", async ({ id, data }) => {
  const response = await request(apiUrl, {
    query: QUEST_UPDATE_QUERY,
    variables: { id, data },
  });
  return response.data.data[endpointNames.quests.update];
});

const QUEST_DELETE_QUERY = `
  mutation ${queryNames.DELETE_QUEST} ($id: ID!) {
    ${endpointNames.quests.delete}(id: $id)
  }
`;

export const deleteQuest = createAsyncThunk<EntityId, EntityId>(
  "quests/deleteQuest",
  async (id) => {
    await request(apiUrl, {
      query: QUEST_DELETE_QUERY,
      variables: { id },
    });
    return id;
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

    builder.addCase(
      addQuest.fulfilled,
      (state, action: PayloadAction<IQuest>) => {
        console.log(action.payload);
        questsAdapter.upsertOne(state, action.payload);
        state.questsPage = {
          error: null,
          ids: [],
          status: "initial",
        };
      }
    );

    builder.addCase(
      updateQuest.fulfilled,
      (state, action: PayloadAction<IQuest>) => {
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
