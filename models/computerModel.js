// require mongoose
const mongoose = require('mongoose');

// get the Schema class from mongoose
const Schema = mongoose.Schema;

//create computer schema

const computerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        tolowercase: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    processor: {
        type: String,
        required: true,
        trim: true
    },
    graphics: {
        type: String,
        required: true,
        trim: true
    },
    ram: {
        type: String,
        required: true,
        trim: true
    },
    storage: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String
    },
    description: {
        type: String
        , trim: true
    },
    OS: {
        type: String,
        trim: true
    }
}, {
    timestamps: true , collection: 'computers'
});

//export the computer model
module.exports = Computer = mongoose.model('Computer', computerSchema);