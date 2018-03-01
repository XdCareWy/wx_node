const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PoetrySchema = new Schema({
	url: String,
	topic: String,
	description: String,
	createDate: {
		type: Date,
		default: Date.now
	},
	updateDate: {
		type: Date,
		default: Date.now
	}
});

const PoetryModel = mongoose.model('poetry', PoetrySchema);

module.exports = PoetryModel;