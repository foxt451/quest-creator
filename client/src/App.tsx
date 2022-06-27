import React from "react";
import QuestListPage from "./pages/QuestListPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuestListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
