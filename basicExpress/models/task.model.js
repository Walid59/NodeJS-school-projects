// fichier ./models/address.model.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description : { type : String, unique: true, required: true},
    emergency :  {type: Number, min : 1 , max: 5, default:3},
  });

module.exports = addressSchema;