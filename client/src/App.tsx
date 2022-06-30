import React from "react";
import QuestListPage from "./pages/QuestListPage";
import QuestDetailsPage from "./pages/QuestDetailsPage";
import AddQuestPage from "./pages/AddQuestPage";
import UpdateQuestPage from "./pages/UpdateQuestPage";
import { Container } from "@mui/material";
import { paths, pathParameters } from "./constants/paths";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container sx={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Navigate to={paths.QUESTS} />} />
          <Route path={paths.QUESTS} element={<QuestListPage />} />
          <Route
            path={`${paths.QUESTS}/:${pathParameters.QUEST_ID}`}
            element={<QuestDetailsPage />}
          />
          <Route
            path={`${paths.QUESTS}/:${pathParameters.QUEST_ID}${paths.UPDATE}`}
            element={<UpdateQuestPage />}
          />
          <Route
            path={`${paths.QUESTS}${paths.CREATE}`}
            element={<AddQuestPage />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
