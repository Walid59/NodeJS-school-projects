// fichier ./models/user.model.js
const mongoose = require('mongoose');

// definition of schema
const userSchema = new mongoose.Schema({
    name : String,
    login : { type : String, required : true, unique : true},
    password : { type : String, required : true},
    admin : { type : Boolean, default: false },
    objectsBorrowed: {type : [ mongoose.Schema.ObjectId ] ,set: array => setArrayMaxSize(array)}
});

function setArrayMaxSize(array){
    if(array.length > 2) return array.slice(0,2);
    else return array;
}

module.exports = userSchema;

// model
const dbConnection = require('../controllers/db.controller');
const User = dbConnection.model('AppBase',userSchema,'users');

module.exports.model = User