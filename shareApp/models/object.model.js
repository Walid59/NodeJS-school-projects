// fichier ./models/user.model.js
const mongoose = require('mongoose');

// definition of schema
const objectSchema = new mongoose.Schema({
    description : String,
    borrowerId : { type : mongoose.Schema.ObjectId, required : false, unique : true, index:true, sparse: true},
    ownerId : {type: mongoose.Schema.ObjectId, required: true, index:true, sparse: true}
});

module.exports = objectSchema;

// model
const dbConnection = require('../controllers/db.controller');
const User = dbConnection.model('AppBase',objectSchema,'objects');

module.exports.model = User