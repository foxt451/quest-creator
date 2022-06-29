import React from "react";
import QuestListPage from "./pages/QuestListPage";
import QuestDetailsPage from "./pages/QuestDetailsPage";
import { Container } from "@mui/material";
import { paths, pathParameters } from "./constants/paths";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to={paths.QUESTS} />} />
          <Route path={paths.QUESTS} element={<QuestListPage />} />
          <Route
            path={`${paths.QUESTS}/:${pathParameters.QUEST_ID}`}
            element={<QuestDetailsPage />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
