import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { SetupWorkerApi } from "msw";

const container = document.getElementById("root")!;
const root = createRoot(container);

function prepare() {
  if (process.env.REACT_APP_MOCK === "true") {
    const { worker }: { worker: SetupWorkerApi } = require("./mocks/browser");
    return worker.start({ onUnhandledRequest: "bypass" });
  }
  return Promise.resolve();
}

prepare().then(() => {
  root.render(
    <Provider store={store}>
      <PersistGate loading={<>Loading...</>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
