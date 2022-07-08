import { endpointNames, inputTypeNames } from "shared";
import { queryNames } from "../../constants/graphql";

const QUEST_DEFAULT_FIELDS = `
id,
name,
description,
image,
difficulty,
duration,
createdAt,
updatedAt,
user {
  id,
  username
}
`;

export const QUESTS_QUERY = `
  query ${queryNames.quests.ALL} {
    ${endpointNames.quests.all} {
      ${QUEST_DEFAULT_FIELDS}
    }
  }
`;

export const QUEST_QUERY = `
  query ${queryNames.quests.SINGLE} ($id: ID!) {
    ${endpointNames.quests.one}(id: $id) {
      ${QUEST_DEFAULT_FIELDS}
    }
  }
`;

export const QUEST_ADD_QUERY = `
  mutation ${queryNames.quests.ADD} ($data: ${inputTypeNames.QUEST_DATA}!) {
    ${endpointNames.quests.add}(data: $data) {
      ${QUEST_DEFAULT_FIELDS}
    }
  }
`;

export const QUEST_UPDATE_QUERY = `
  mutation ${queryNames.quests.UPDATE} ($id: ID!, $data: ${inputTypeNames.QUEST_DATA}!) {
    ${endpointNames.quests.update}(id: $id, data: $data) {
      ${QUEST_DEFAULT_FIELDS}
    }
  }
`;

export const QUEST_DELETE_QUERY = `
  mutation ${queryNames.quests.DELETE} ($id: ID!) {
    ${endpointNames.quests.delete}(id: $id)
  }
`;
