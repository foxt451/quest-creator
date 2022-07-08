import { errorMessages } from "../errors";

export const ownsData = (
  userId: unknown,
  dataOwnerId: unknown
): void | never => {
  if (userId !== dataOwnerId || userId === undefined || userId === null) {
    throw new Error(errorMessages.FORBIDDEN);
  }
};
