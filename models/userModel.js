//require mongoose
const mongoose = require('mongoose');

// get the Schema class from mongoose
const Schema = mongoose.Schema;

// create user schema
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    username:{
        type: String,
        trim: true,
        lowercase: true
    },
    phone: {
        type: Number,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isadmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true, collection: 'users'
});

module.exports = User =  mongoose.model('User', userSchema);