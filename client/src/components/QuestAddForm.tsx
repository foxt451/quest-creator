import React, { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import { questDifficulties } from "shared";
import QuestForm from "./QuestForm/QuestForm";
import { QuestData } from "shared";

const initialValues: QuestData = {
  name: "",
  duration: null,
  difficulty: questDifficulties.easy,
  description: "",
  image: null,
} as const;

const QuestAddForm: FC<{
  onSubmit: SubmitHandler<QuestData>;
}> = ({ onSubmit }) => {
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | false>(false);
  // const handleQuestSubmit: SubmitHandler<FormValues> = async (data) => {
  //   setError(false);
  //   setLoading(true);
  //   try {
  //     const quest = await dispatch(addQuest(data)).unwrap();
  //     navigate(`${paths.QUESTS}/${quest.id}`);
  //   } catch (e: any) {
  //     setError(e?.message ?? errorMessages.default);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // if (loading) {
  //   return <>Loading...</>;
  // }
  // return (
  //   <>
  //     {error && <ErrorBox message={error} />}
  //     <QuestForm initialValues={initialValues} onSubmit={handleQuestSubmit} />
  //   </>
  // );
  return <QuestForm initialValues={initialValues} onSubmit={onSubmit} />;
};

export default QuestAddForm;
