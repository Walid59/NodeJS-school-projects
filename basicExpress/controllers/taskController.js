const { all } = require('../routes');

const Tasks = require('../models/task.model').model;   // on récupère le modèle

const list = async (_, res) => {
    const allTasks = await Tasks.find();  // "await" le résultat de Tasks.find() qui est asynchrone
    res.status(200).json(allTasks);
}
module.exports.list = list;



const create = async (req, res) => {
    const newTaskData = { ...req.body };
    const newTask = await Tasks.create(newTaskData);
    res.status(201).json(newTask);
    console.log("tache creee");
}
module.exports.create = create;
