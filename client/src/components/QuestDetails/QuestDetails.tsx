import React, { FC } from "react";
import { EntityId } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { FaEdit } from "react-icons/fa";
import { paths } from "../../constants/paths";
import { selectQuestById } from "../../store/quests/questsSlice";
import { Box, Typography, Divider, Fab } from "@mui/material";

import styles from "./styles.module.scss";

const QuestDetails: FC<{ questId: EntityId }> = ({ questId }) => {
  const quest = useAppSelector((state) => selectQuestById(state, questId));
  if (!quest) return null;
  return (
    <Box padding={2} sx={{ height: "100%" }}>
      {quest.image && (
        <img src={quest.image} alt="quest" className={styles.questImage} />
      )}
      <Divider sx={{ margin: "1rem" }}>Title</Divider>
      <Typography variant="h5" component="h2">
        {quest.name}
      </Typography>
      <Divider sx={{ margin: "1rem" }}>Description</Divider>
      <Typography variant="subtitle1" component="p">
        {quest.description}
      </Typography>
      <NavLink to={`${paths.QUESTS}/${questId}${paths.UPDATE}`}>
        <Fab color="primary" aria-label="create">
          <FaEdit />
        </Fab>
      </NavLink>
    </Box>
  );
};

export default QuestDetails;
