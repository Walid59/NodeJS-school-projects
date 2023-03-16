// fichier ./models/user.model.js
const mongoose = require('mongoose');

// definition of schema
const objectSchema = new mongoose.Schema({
    description : String,
    borrower : { type : String, required : false, unique : true},
    isShared : { type : Boolean, default: false },
    ownerId : mongoose.ObjectId
});

module.exports = userSchema;

// model
const dbConnection = require('../controllers/db.controller');
const User = dbConnection.model('AppBase',objectSchema,'objects');

module.exports.model = User