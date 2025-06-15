// Get all players schema
export const getPlayersSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          score: { type: 'number' }
        }
      }
    }
  }
};

// Create player schema
export const createPlayerSchema = {
  body: {
    type: 'object',
    required: ['name', 'score'],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 50,
        description: 'Player name'
      },
      score: {
        type: 'number',
        minimum: 0,
        description: 'Player score (must be non-negative)'
      }
    }
  },
  response: {
    201: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    },
    400: {
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
  }
}; 