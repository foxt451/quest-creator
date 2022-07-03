import React from "react";
import {
  QuestListPage,
  QuestDetailsPage,
  AddQuestPage,
  UpdateQuestPage,
  NotFoundPage,
  LoginPage,
  SignupPage
} from "./pages";
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
          <Route path={paths.LOGIN} element={<LoginPage />} />
          <Route path={paths.SIGN_UP} element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
