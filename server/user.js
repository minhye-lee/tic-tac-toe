const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _name: String,
    _win: Number,
    _lose: Number,
    _draw: Number
});
module.exports = mongoose.model('User', UserSchema);

