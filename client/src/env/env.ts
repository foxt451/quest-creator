if (!process.env.REACT_APP_API_URL) {
  throw new Error("REACT_APP_API_URL is not set");
}

export const apiUrl = process.env.REACT_APP_API_URL;
