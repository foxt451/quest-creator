import { endpointNames } from "shared";
import { queryNames } from "../../constants/graphql";

const USER_FIELDS = `
id,
username,
email
`;

const TOKENS_FIELDS = `
accessToken,
refreshToken
`;

export const LOGIN_QUERY = `
  mutation ${queryNames.profile.LOGIN} ($email: String!, $password: String!) {
    ${endpointNames.profile.login}(email: $email, password: $password) {
      tokens {
        ${TOKENS_FIELDS}
      },
      user {
        ${USER_FIELDS}
      }
    }
  }
`;

export const REGISTER_QUERY = `
  mutation ${queryNames.profile.REGISTER} ($username: String!, $email: String!, $password: String!) {
    ${endpointNames.profile.register}(username: $username, email: $email, password: $password) {
      tokens {
        ${TOKENS_FIELDS}
      },
      user {
        ${USER_FIELDS}
      }
    }
  }
`;

export const REFRESH_QUERY = `
  mutation ${queryNames.profile.REFRESH_TOKENS} ($refreshToken: String!, $userId: ID!) {
    ${endpointNames.profile.refreshTokens}(refreshToken: $refreshToken, userId: $userId) {
      ${TOKENS_FIELDS}
    }
  }
`;
