import React, { FC } from "react";
import { IQuest } from "shared";
import { Grid } from "@mui/material";
import QuestCard from "./QuestDetails/QuestCard";

const QuestList: FC<{ quests: IQuest[] }> = ({ quests }) => {
  return (
    <Grid container rowSpacing={6} columnSpacing={6} alignItems="stretch">
      {quests.map((quest) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={quest.id}>
          <QuestCard quest={quest} />
        </Grid>
      ))}
    </Grid>
  );
};

export default QuestList;
