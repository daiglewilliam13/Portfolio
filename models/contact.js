const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const contactSchema = new Schema({
	name: String,
	phone: String,
	email: String,
	_id: ObjectId,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;