module.exports = {
  type: 'object',
  properties: {
    slugs: {
      type: 'object',
      properties: {
        root: {
          type: 'string',
          pattern: '[A-Z\-]*', // eslint-disable-line no-useless-escape
          minLength: 3,
          prompt: {
            message: 'What\'s the root slug for this locale, i.e., a generic topic slug?\n',
            format: (text) => text.toUpperCase(),
          },
        },
        wild: {
          type: 'string',
          pattern: '[A-Z\-]*', // eslint-disable-line no-useless-escape
          prompt: {
            message: 'What\'s the wild slug for this locale, i.e., a more specific page slug?\n',
            format: (text) => text.toUpperCase(),
          },
        },
      },
      required: ['root', 'wild'],
    },
    seoTitle: {
      type: 'string',
      maxLength: 110, // Per Google News SEO guidelines
      prompt: {
        message: 'What\'s the title of this page for search listings (seoTitle)?\n',
      },
    },
    seoDescription: {
      type: 'string',
      prompt: {
        message: 'What\'s the description of this page for search listings (seoDescription)?\n',
      },
    },
    shareTitle: {
      type: 'string',
      prompt: {
        message: 'What\'s the title of this page for share cards (shareTitle)?\n',
      },
    },
    shareDescription: {
      type: 'string',
      prompt: {
        message: 'What\'s the description of this page for share cards (shareDescription)?\n',
      },
    },
    image: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          pattern: '^img\/[a-zA-Z0-9/_-]+\.(jpg|png)$', // eslint-disable-line no-useless-escape
          prompt: {
            message: (variablePath, invalidMessage) =>
              !invalidMessage ?
                'What\'s the relative path to the share image?\n' :
                'What\'s the relative path to the share image?\n(Should be img/<...>.jpg or img/<...>.png)\n',
            initial: 'img/share.jpg',
          },
        },
        width: { type: 'integer' },
        height: { type: 'integer' },
      },
      required: ['path'],
    },
    editions: {
      type: 'object',
      properties: {
        media: {
          type: 'object',
          properties: {
            interactive: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  pattern: '[a-zA-Z0-9/-]+',
                  prompt: {
                    message: 'The media interactive ID should\'ve been filled in automatically from the graphics server, but wasn\'t. Contact a developer.\n',
                  },
                },
                url: {
                  type: 'string',
                  format: 'uri',
                  prompt: {
                    message: 'The media interactive URL should\'ve been filled in automatically from the graphics server, but wasn\'t. Contact a developer.\n',
                  },
                },
              },
              required: ['id', 'url'],
            },
            'media-interactive': {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  pattern: '[a-zA-Z0-9/-]+',
                  prompt: {
                    message: 'The media media-interactive ID should\'ve been filled in automatically from the graphics server, but wasn\'t. Contact a developer.\n',
                  },
                },
              },
              required: ['id'],
            },
          },
          required: ['interactive', 'media-interactive'],
        },
        public: {
          type: 'object',
          properties: {
            interactive: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  pattern: '[a-zA-Z0-9/-]+',
                  prompt: {
                    message: 'The public interactive ID should\'ve been filled in automatically from the graphics server, but wasn\'t. Contact a developer.\n',
                  },
                },
                url: {
                  type: 'string',
                  format: 'uri',
                  prompt: {
                    message: 'The public interactive URL should\'ve been filled in automatically from the graphics server, but wasn\'t. Contact a developer.\n',
                  },
                },
              },
              required: ['id', 'url'],
            },
          },
          required: ['interactive'],
        },
      },
      required: ['media', 'public'],
    },
  },
  required: [
    'slugs',
    'seoTitle',
    'seoDescription',
    'shareTitle',
    'shareDescription',
    'image',
  ],
};
