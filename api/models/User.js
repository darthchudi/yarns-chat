const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
	firstname: String,
	lastname: String,
	username: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true
	},
	online: {
		type: Boolean,
		default: false
	},
	password: String
});

userSchema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password);
	next();
});

userSchema.methods.comparePassword = function(plaintext){
	return bcrypt.compareSync(plaintext, this.password);
}

module.exports = mongoose.model('User', userSchema);