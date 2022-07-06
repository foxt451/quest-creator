const ENV_OPTIONAL = {
  API_URL: process.env.REACT_APP_API_URL,
};

export const ENV = Object.entries(ENV_OPTIONAL).reduce<Record<string, string>>(
  (acc, [key, value]) => {
    if (value === undefined) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return { ...acc, [key]: value };
  },
  {}
);
