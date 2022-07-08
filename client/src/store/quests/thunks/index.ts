import { createAsyncThunk, EntityId } from "@reduxjs/toolkit";
import { request } from "../../../helpers/graphql";
import { Quest } from "../../../types/models/Quest";
import { ENV } from "../../../env/env";
import {
  QUESTS_QUERY,
  QUEST_ADD_QUERY,
  QUEST_DELETE_QUERY,
  QUEST_QUERY,
  QUEST_UPDATE_QUERY,
} from "../../../queries";
import { endpointNames, QuestData } from "shared";

export const loadQuests = createAsyncThunk<Quest[]>(
  "quests/loadQuests",
  async () => {
    const response = await request<{ [endpointNames.quests.all]: Quest[] }>(
      ENV.API_URL,
      {
        query: QUESTS_QUERY,
        variables: {},
      }
    );
    return response[endpointNames.quests.all];
  }
);

export const loadQuest = createAsyncThunk<Quest, EntityId>(
  "quests/loadQuest",
  async (id: EntityId) => {
    const response = await request<{ [endpointNames.quests.one]: Quest }>(
      ENV.API_URL,
      {
        query: QUEST_QUERY,
        variables: { id },
      }
    );
    return response[endpointNames.quests.one];
  }
);

export const addQuest = createAsyncThunk<Quest, QuestData>(
  "quests/addQuest",
  async (data) => {
    const response = await request<{ [endpointNames.quests.add]: Quest }>(
      ENV.API_URL,
      {
        query: QUEST_ADD_QUERY,
        variables: { data },
      }
    );

    return response[endpointNames.quests.add];
  }
);

export const updateQuest = createAsyncThunk<
  Quest,
  { id: EntityId; data: QuestData }
>("quests/updateQuest", async ({ id, data }) => {
  const response = await request<{ [endpointNames.quests.update]: Quest }>(
    ENV.API_URL,
    {
      query: QUEST_UPDATE_QUERY,
      variables: { id, data },
    }
  );
  return response[endpointNames.quests.update];
});

export const deleteQuest = createAsyncThunk<EntityId, EntityId>(
  "quests/deleteQuest",
  async (id) => {
    await request(ENV.API_URL, {
      query: QUEST_DELETE_QUERY,
      variables: { id },
    });
    return id;
  }
);
