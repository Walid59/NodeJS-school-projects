// fichier ./models/user.model.js
const mongoose = require('mongoose');

// definition of schema
const objectSchema = new mongoose.Schema({
    description : String,
    borrower : { type : String, required : false, unique : true},
    //isShared : { type : Boolean, default: false }, ---> doit etre une fonction plutot qu'un element de la table
    ownerId : {type: mongoose.ObjectId, required: true, unique: true}
});

module.exports = objectSchema;

// model
const dbConnection = require('../controllers/db.controller');
const User = dbConnection.model('AppBase',objectSchema,'objects');

module.exports.model = User