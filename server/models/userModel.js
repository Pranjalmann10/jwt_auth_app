const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
       // unique: true,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    role: {
        type: String,
        //enum: ['user', 'admin'],
        default: 'user',
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;