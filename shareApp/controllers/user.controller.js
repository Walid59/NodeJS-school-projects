const User = require('../models/user.model').model;

module.exports.home = (_,res) => res.redirect('/home.html');

module.exports.me =
    async (req, res) =>  {
        const user = await User.findById(req.userId);
        res.status(200).json({ id : user._id, name : user.name, objectsBorrowed: user.objectsBorrowed });
    }

module.exports.getUser =
    async (req,res) => {
        const user = await User.findById( req.params.userId );
        res.status(200).json(user);
    }

module.exports.update =
    async (req,res) => {
        const updatedData = { ...req.body };
        console.log(updatedData);
        const user = await User.findByIdAndUpdate(req.userId,
            updatedData,
            { new : true });
        res.status(200).json({ name : user.name , message : 'mise à jour réussie'});
    }


module.exports.updateUser =
  async (req, res) => {
    const updatedUserData = { ...req.body };
    const updatedUser = await User.findByIdAndUpdate( req.params.userId, updatedUserData, { new : true } );
    res.status(201).json(updatedUser);
  }
