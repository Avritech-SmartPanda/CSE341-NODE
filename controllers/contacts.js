require('dotenv').config();
const db = require('../models');
const Contact = db.contacts;
const ObjectId = require('mongodb').ObjectId;

const apiKey = process.env.API_KEY;
const createContact = async (req, res) => {
  try {
    // Validation
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).send({ message: 'All fields are required!' });
    }

    // Check if email already exists
    const contactExists = await Contact.findOne({ email });
    if (contactExists) {
      return res.status(400).send({ message: 'Contact with the same email already exists!' });
    }


    // Create a contact
    const contact = new Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    });


    // Save new contact in the database
    const newContact = await contact.save();
    res.status(200).send(newContact);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Error occurred while creating the Contact.',
    });
  }
};


const getContacts = (req, res) => {
  Contact.find({}, { firstName: 1, lastName: 1, email: 1, favoriteColor: 1, birthday: 1, _id: 1, })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Error occurred while retrieving contacts.',
      });
    });

};


const getContact = async (req, res) => {
  try {
    const contact_id = ObjectId.createFromHexString(req.params.id);
    const contact = await Contact.findOne({ _id: contact_id })
    if (contact) {
      res.status(200).send(contact);
    } else {
      res.status(404).send({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Error occurred while retrieving contact.',
    });
  }
};


const updateContact = async (req, res) => {
  try {
    const contact_id = ObjectId.createFromHexString(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Validation
    if (!contact.firstName || !contact.lastName || !contact.email || !contact.favoriteColor || !contact.birthday) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contact_id,  // contact's ObjectId
      { $set: contact },  // update the fields
      { new: true }  // return the updated document
    );

    if (updatedContact) {
      res.status(200).send(updatedContact);
    } else {
      res.status(404).send({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error updating contact with id ' + contact_id,
    });
  }
};


const deleteContact = (req, res) => {
  const id = req.params.id;

  Contact.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else {
        res.status(200).send({
          message: 'Contact was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Contact with id=' + id,
      });
    });
};


module.exports = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
}