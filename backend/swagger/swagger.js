const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vehicle Rental Management System API',
      version: '1.0.0',
      description: 'API documentation for the Vehicle Rental Management System (customers, vehicles, rentals)',
    },
    servers: [{ url: 'http://localhost:3000', description: 'Local server' }],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;