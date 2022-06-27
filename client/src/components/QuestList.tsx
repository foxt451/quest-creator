import React, { FC } from "react";
import { IQuest } from "shared/interfaces/IQuest";

const QuestList: FC<{ quests: IQuest[] }> = ({ quests }) => {
  return (
    <div>
      {quests.map((quest) => (
        <div key={quest.id}>{quest.name}</div>
      ))}
    </div>
  );
};

export default QuestList;
