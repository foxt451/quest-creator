type TArgs = {
  text: string;
  maxLength: number;
  trailingText?: string;
};

export const cutText = ({
  text,
  maxLength,
  trailingText = "...",
}: TArgs): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + trailingText;
};
