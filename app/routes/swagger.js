const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SubCategory API',
      version: '1.0.0',
      description: 'API documentation for subCategory management',
    },
  },
  apis: ['../controllers/subCategory.controller.js'], // Path to the API docs
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};