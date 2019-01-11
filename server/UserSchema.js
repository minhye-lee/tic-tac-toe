const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : String,
    score : {
        win : Number,
        lose : Number,
        draw : Number
    }
})

const User = mongoose.model('User', UserSchema);
