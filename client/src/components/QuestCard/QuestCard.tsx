import React, { FC } from "react";
import { Paper, Typography, Chip, Box, Divider } from "@mui/material";
import { QuestDifficulty, questDifficulties } from "shared";
import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "../../store/hooks";
import { selectQuestById } from "../../store/quests/questsSlice";
import { cutText } from "../../helpers/cutText";
import { FaClock } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { images } from "../../constants/images";
import { paths } from "../../constants/paths";
import styles from "./styles.module.scss";
import questStyles from "../common-styles/quest-styles.module.scss";

const getDifficultyColor = (difficulty: QuestDifficulty) => {
  switch (difficulty) {
    case questDifficulties.easy:
      return "primary";
    case questDifficulties.medium:
      return "secondary";
    case questDifficulties.hard:
      return "error";
  }
  return "info";
};

const MAX_VISIBLE_DESCRIPTION_LENGTH = 150;
const MAX_VISIBLE_NAME_LENGTH = 15;

const QuestCard: FC<{ questId: EntityId }> = ({ questId }) => {
  const quest = useAppSelector((state) => selectQuestById(state, questId));
  if (!quest) return null;
  const otherInfoComponent = (
    <>
      <Chip
        icon={<FaClock />}
        label={quest.duration === null ? ">24 h" : `~${quest.duration} min`}
        variant="outlined"
      />
    </>
  );
  return (
    <Paper elevation={2} sx={{ height: "100%", width: "100%" }}>
      <Box className={styles.questCard} padding={2} sx={{ height: "100%" }}>
        <img
          src={quest.image ?? images.quests.defaultImage}
          alt="quest"
          className={questStyles.questImage}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = images.quests.defaultImage;
          }}
        />
        <Divider sx={{ margin: "1rem" }}>About</Divider>
        <NavLink to={`${paths.QUESTS}/${questId}`}>
          <Typography variant="h5" component="h2">
            {quest.name}
          </Typography>
        </NavLink>
        <Typography variant="subtitle2" component="p" marginTop={2}>
          by{" "}
          {cutText({
            text: quest.user.username,
            maxLength: MAX_VISIBLE_NAME_LENGTH,
          })}
        </Typography>
        <Typography variant="subtitle1" component="p" marginTop={2}>
          {cutText({
            text: quest.description,
            maxLength: MAX_VISIBLE_DESCRIPTION_LENGTH,
          })}
        </Typography>

        <>
          <Divider sx={{ margin: "1rem" }}>Other Info</Divider>
          <Box>{otherInfoComponent}</Box>
        </>
        <Chip
          sx={{ marginTop: "auto", alignSelf: "center" }}
          label={quest.difficulty}
          color={getDifficultyColor(quest.difficulty)}
        />
      </Box>
    </Paper>
  );
};

export default QuestCard;
