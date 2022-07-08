import React, { FC, useState } from "react";
import { EntityId } from "@reduxjs/toolkit";
import ErrorBox from "../ErrorBox";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { FaEdit, FaTrash } from "react-icons/fa";
import { paths } from "../../constants/paths";
import { images } from "../../constants/images";
import styles from "./styles.module.scss";
import { selectQuestById } from "../../store/quests/questsSlice";
import { deleteQuest } from "../../store/quests/thunks";
import { selectUser } from "../../store/profile/profileSlice";
import { Box, Typography, Divider, Fab } from "@mui/material";
import questStyles from "../common-styles/quest-styles.module.scss";
import { getMessageOfCaughtError } from "../../helpers/errors";

const QuestDetails: FC<{ questId: EntityId }> = ({ questId }) => {
  const user = useAppSelector(selectUser);
  const quest = useAppSelector((state) => selectQuestById(state, questId));
  const navigate = useNavigate();

  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | false>(false);
  const dispatch = useAppDispatch();
  const onDeleteClick = async () => {
    setDeleting(true);
    try {
      await dispatch(deleteQuest(questId)).unwrap();
      navigate(paths.QUESTS);
    } catch (e: unknown) {
      setError(getMessageOfCaughtError(e));
    } finally {
      setDeleting(false);
    }
  };

  if (!quest) return null;
  if (deleting) return <>Loading...</>;
  return (
    <Box padding={2} sx={{ height: "100%" }}>
      {error && <ErrorBox message={error} />}
      {quest.image && (
        <img
          src={quest.image}
          alt="quest"
          className={questStyles.questImage}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = images.quests.defaultImage;
          }}
        />
      )}
      <Divider sx={{ margin: "1rem" }}>Title</Divider>
      <Typography variant="h5" component="h2">
        {quest.name}
      </Typography>
      <Divider sx={{ margin: "1rem" }}>Description</Divider>
      <Typography variant="subtitle1" component="p">
        {quest.description}
      </Typography>
      {user?.id === quest.user.id && (
        <Box className={styles.controlButtons}>
          <NavLink to={`${paths.QUESTS}/${questId}${paths.UPDATE}`}>
            <Fab color="primary" aria-label="create">
              <FaEdit />
            </Fab>
          </NavLink>
          <Fab color="error" aria-label="delete" onClick={onDeleteClick}>
            <FaTrash />
          </Fab>
        </Box>
      )}
    </Box>
  );
};

export default QuestDetails;
