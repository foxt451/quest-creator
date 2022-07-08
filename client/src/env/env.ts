import { extractStringEnvVar } from "shared";

export const ENV = {
  API_URL: extractStringEnvVar("REACT_APP_API_URL"),
} as const;
