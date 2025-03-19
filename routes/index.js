const routes = require('express').Router();
const contact = require('./contacts');

routes.use('/contacts', contact);

routes.use(
    '/',
    (docData = (req, res) => {
      let docData = {
        documentationURL: 'https://github.com/Avritech-SmartPanda',
      };
      res.send(docData);
    })
  );
module.exports = routes;