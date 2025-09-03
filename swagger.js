const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'StudyMatch API',
      version: '1.0.0',
      description: '스터디 그룹 CRUD, 일정, 출석, 알림 API 명세'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ]
  },
  apis: ['./routes/*.js'] // JSDoc 주석을 읽어올 경로
};

const specs = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = setupSwagger;