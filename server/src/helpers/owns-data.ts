export const ownsData = (
  userId: unknown,
  dataOwnerId: unknown
): void | never => {
  if (userId !== dataOwnerId || userId === undefined || userId === null) {
    throw new Error("You are not authorized to access this resource");
  }
};
