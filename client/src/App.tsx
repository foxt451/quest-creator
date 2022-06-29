import React from "react";
import QuestListPage from "./pages/QuestListPage";
import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<QuestListPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
