export const ownsData = (
  userId: unknown,
  dataOwnerId: unknown
): void | never => {
  if (userId !== dataOwnerId) {
    throw new Error("You are not authorized to access this resource");
  }
};
