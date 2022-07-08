import { errorMessages } from "../constants/messages";
import { hasProps } from "shared";

export const getMessageOfCaughtError = (error: unknown): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    hasProps(error, "message") &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
  return errorMessages.default;
};
