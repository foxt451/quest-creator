import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { SetupWorkerApi } from "msw";

const container = document.getElementById("root")!;
const root = createRoot(container);

if (!process.env.REACT_APP_API_URL) {
  throw new Error("REACT_APP_API_URL is not set");
}

if (process.env.NODE_ENV === "development") {
  const { worker }: { worker: SetupWorkerApi } = require("./mocks/browser");
  console.log(process.env.REACT_APP_API_URL);

  worker.start();
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
