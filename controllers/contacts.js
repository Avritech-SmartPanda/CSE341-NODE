const mongoose = require('mongoose');
const createContactModel = require('../models/contact');
const Contact = createContactModel(mongoose);

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error retrieving contacts:', err);
    res.status(500).send('Error retrieving contacts');
  }
};

const getContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (err) {
    console.error('Error retrieving contact:', err);
    res.status(500).send('Error retrieving contact');
  }
};



module.exports = {
  getContacts,
  getContact
}