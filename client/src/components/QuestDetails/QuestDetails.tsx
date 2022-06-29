import React, { FC } from "react";
import { Paper, Typography, Chip, Box, Divider } from "@mui/material";
import { IQuest, QuestDifficulty } from "shared";
import { questDifficulties } from "shared";
import { cutText } from "../../helpers";
import { FaClock } from "react-icons/fa";
import { defaultImages } from "../../constants/defaultImages";
import styles from "./styles.module.scss";

const getDifficultyColor = (difficulty: QuestDifficulty) => {
  switch (difficulty) {
    case questDifficulties.easy:
      return "primary";
    case questDifficulties.medium:
      return "secondary";
    case questDifficulties.hard:
      return "error";
  }
};

const MAX_VISIBLE_DESCRIPTION_LENGTH = 150;

const QuestDetails: FC<{ quest: IQuest }> = ({ quest }) => {
  const otherInfoComponent = (
    <>
      {quest.duration && (
        <>
          <Chip
            icon={<FaClock />}
            label={`~${quest.duration} min`}
            variant="outlined"
          />
        </>
      )}
    </>
  );
  return (
    <Paper elevation={2} sx={{ height: "100%", width: "100%" }}>
      <Box className={styles.questCard} padding={2} sx={{ height: "100%" }}>
        <img
          src={quest.image ?? defaultImages.defaultQuestImage}
          alt="quest"
          className={styles.questImage}
        />
        <Divider sx={{ margin: "1rem" }}>About</Divider>
        <Typography variant="h5" component="h2">
          {quest.name}
        </Typography>
        <Typography variant="subtitle1" component="p" marginTop={2}>
          {cutText(quest.description, MAX_VISIBLE_DESCRIPTION_LENGTH)}
        </Typography>

        {otherInfoComponent.props.children && (
          <>
            <Divider sx={{ margin: "1rem" }}>Other Info</Divider>
            <Box>{otherInfoComponent}</Box>
          </>
        )}
        <Chip
          sx={{ marginTop: "auto", alignSelf: "center" }}
          label={quest.difficulty}
          color={getDifficultyColor(quest.difficulty)}
        />
      </Box>
    </Paper>
  );
};

export default QuestDetails;
