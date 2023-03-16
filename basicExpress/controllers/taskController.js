const { get } = require('../models/task.model');
const { all } = require('../routes');

const Tasks = require('../models/task.model').model;   // on récupère le modèle

const list = async (_, res) => {
    const allTasks = await Tasks.find();  // "await" le résultat de Tasks.find() qui est asynchrone
    res.status(200).json(allTasks);
}
module.exports.list = list;


const getTask =
  async (req,res) => {
    const book = await Tasks.findById( req.params.taskId );
    res.status(200).json(book);
  }
module.exports.getTask = getTask;


const create = async (req, res) => {
    const newTaskData = { ...req.body };
    const newTask = await Tasks.create(newTaskData);
    res.status(201).json(newTask);
    console.log("tache creee");
}
module.exports.create = create;


