import { extractStringEnvVar } from "shared";

export const ENV = {
  API_URL: extractStringEnvVar("REACT_APP_API_URL"),
} as const;

// export const ENV = Object.entries(ENV_OPTIONAL).reduce<
//   Readonly<Record<keyof typeof ENV_OPTIONAL, string>>
// >((acc, [key, value]) => {
//   if (value === undefined) {
//     throw new Error(`Missing environment variable: ${key}`);
//   }
//   return { ...acc, [key]: value };
// }, {});
