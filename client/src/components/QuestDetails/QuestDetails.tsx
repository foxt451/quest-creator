import React, { FC, useState } from "react";
import { EntityId } from "@reduxjs/toolkit";
import ErrorBox from "../ErrorBox";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { FaEdit, FaTrash } from "react-icons/fa";
import { paths } from "../../constants/paths";
import { selectQuestById, deleteQuest } from "../../store/quests/questsSlice";
import { Box, Typography, Divider, Fab } from "@mui/material";

import styles from "./styles.module.scss";

const QuestDetails: FC<{ questId: EntityId }> = ({ questId }) => {
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
    } catch (e: any) {
      setError(e?.message ?? "Unknown error. Try again");
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
      <Box>
        <NavLink to={`${paths.QUESTS}/${questId}${paths.UPDATE}`}>
          <Fab color="primary" aria-label="create">
            <FaEdit />
          </Fab>
        </NavLink>
        <Fab color="error" aria-label="delete" onClick={onDeleteClick}>
          <FaTrash />
        </Fab>
      </Box>
    </Box>
  );
};

export default QuestDetails;
