export function extractStringEnvVar(key: string): string {
  const value = process.env[key];

  if (value === undefined) {
    const message = `The environment variable "${key}" must be defined.`;
    throw new Error(message);
  }

  return value;
}
