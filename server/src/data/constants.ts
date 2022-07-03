export const tableNames = {
  USERS: "users",
} as const;

export const columnNames = {
  users: {
    email: "email",
    username: "username",
    password: "password",
  },
  base: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
};
