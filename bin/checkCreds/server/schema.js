module.exports = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      pattern: '^[0-9]{7}',
      prompt: {
        message: 'What\'s your username for publishing to the graphics server?',
      },
    },
    password: {
      type: 'string',
      minLength: 8,
      prompt: {
        message: 'What\'s your password for publishing to the graphics server?',
      },
    },
  },
  required: ['username', 'password'],
};
