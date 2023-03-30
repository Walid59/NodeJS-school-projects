const Objects = require('../models/object.model').model;   // on récupère le modèle

const list = async (_, res) => {
    const allObjects = await Objects.find();
    res.status(200).json(allObjects);
}
module.exports.list = list;


const getObject =
    async (req,res) => {
        const object = await Objects.findById( req.params.objectId );
        res.status(200).json(object);
    }
module.exports.getObject = getObject;


const create = async (req, res) => {
    const newObjectData = { ...req.body };
    const newObject = await Objects.create(newObjectData);
    res.status(201).json(newObject);
}
module.exports.create = create;

const deleteObject =
    async (req,res) => {
        try {
            await Objects.findByIdAndRemove( req.params.objectId );
            console.log(`--> object ${req.params.objectId} deleted`);
            res.status(200).json(null);
        }
        catch(error) {
            throw error ;
        }
    }
module.exports.deleteObject = deleteObject;

const updateObject =
  async (req, res) => {
    const updatedObjectData = { ...req.body };
    const updatedObject = await Objects.findByIdAndUpdate( req.params.objectId, updatedObjectData, { new : true } );
    res.status(201).json(updatedObject);
  }
module.exports.updateObject = updateObject;