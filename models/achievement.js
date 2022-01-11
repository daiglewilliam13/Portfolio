const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const achievementSchema = new Schema({
	achievements: [String],
	name: String,
	date: Date
	
});

const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;