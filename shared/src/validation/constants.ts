export const validationConstants = {
  user: {
    username: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 20,
    },
    password: {
      MIN_LENGTH: 6,
    },
  },
  quest: {
    name: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 50,
    },
    description: {
      MAX_LENGTH: 500,
    },
  },
};
