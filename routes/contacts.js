const router = require('express').Router();
const app = require('express')();
const { getContacts, getContact, createContact, updateContact, deleteContact } = require('../controllers/contacts');
const bodyParser = require('body-parser');



router.get('/', getContacts);
router.post('/', createContact);
router.get('/:id', getContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);
app.use(bodyParser.json());
module.exports = router;
