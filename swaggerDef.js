const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API Documentation',
      version: '1.0.0',
      description: 'Documentation for my Express API',
    },
  },
  apis: ['./controllers/*.js'], // Path to the API files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
