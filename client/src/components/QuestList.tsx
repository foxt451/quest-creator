import React, { FC } from "react";
import { EntityId } from "@reduxjs/toolkit";
import { Grid } from "@mui/material";
import QuestCard from "./QuestCard/QuestCard";

const QuestList: FC<{ questIds: EntityId[] }> = ({ questIds }) => {
  return (
    <Grid container rowSpacing={6} columnSpacing={6} alignItems="stretch">
      {questIds.map((questId) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={questId}>
          <QuestCard questId={questId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default QuestList;
