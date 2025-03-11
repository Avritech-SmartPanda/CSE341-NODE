const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');


routes.get('/', lesson1Controller.daphneRoute);
routes.get('/about', lesson1Controller.aboutRoute);

module.exports = routes;

