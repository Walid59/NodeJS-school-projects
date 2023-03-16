// fichier ./models/address.model.js
const mongoose = require('mongoose');

//schema
const taskSchema = new mongoose.Schema({
    description : { type : String, unique: true, required: true},
    urgency :  {type: Number, min : 1 , max: 5, default:3},
  });

module.exports = taskSchema;

const dbConnection = require('../controllers/db.controller');  // importation de l'objet qui gère la connexion

const Tasks = dbConnection.model('Task', taskSchema, 'tasks'); // création du modèle qui lie le schéma à la collection tasks

module.exports.model = Tasks; 