import React, { FC, useState } from "react";
import { IQuest } from "../../interfaces/IQuest";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Slider,
  Typography,
  Switch,
  FormControl,
  Select,
  FormControlLabel,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { questDifficulties } from "shared";
import styles from "./styles.module.scss";

export type FormValues = Pick<
  IQuest,
  "name" | "duration" | "difficulty" | "description" | "image"
>;

// TODO: implement image upload
const QuestForm: FC<{
  initialValues: FormValues;
  onSubmit: SubmitHandler<FormValues>;
}> = ({ initialValues, onSubmit }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialValues,
  });
  const [durationMore, setDurationMore] = useState(
    initialValues.duration === null
  );

  const onMoreSwitchChange = (e: unknown, checked: boolean) => {
    setDurationMore(checked);
  };

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    const finalData = {
      ...data,
      duration: durationMore ? null : (data.duration ?? 0) * 60,
    };
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <TextField
        label="Quest title"
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        {...register("name", { required: "Please enter a title" })}
        margin="normal"
      />
      <TextField
        multiline
        fullWidth
        rows={7}
        label="Description"
        error={Boolean(errors.description)}
        helperText={errors.description?.message}
        {...register("description")}
        margin="normal"
      />
      <Typography variant="h6" component="p">
        Approximate duration (in hours)
      </Typography>
      <Controller
        name="duration"
        control={control}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <Slider
            onBlur={onBlur}
            onChange={onChange}
            value={value ?? 0}
            sx={{ maxWidth: "400px" }}
            defaultValue={1}
            step={0.5}
            min={0}
            disabled={durationMore}
            valueLabelDisplay="auto"
            max={24}
          />
        )}
      ></Controller>
      <FormControlLabel
        value="more"
        control={<Switch />}
        checked={durationMore}
        onChange={onMoreSwitchChange}
        label="> 24 hours"
      />
      <FormControl sx={{ margin: "2rem" }}>
        <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Select
              value={value}
              onChange={onChange}
              sx={{ minWidth: "150px" }}
              labelId="difficulty-select-label"
              label="Difficulty"
            >
              {Object.values(questDifficulties).map((questDifficulty) => (
                <MenuItem key={questDifficulty} value={questDifficulty}>
                  {questDifficulty}
                </MenuItem>
              ))}
            </Select>
          )}
          name="difficulty"
          control={control}
        />
      </FormControl>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default QuestForm;
