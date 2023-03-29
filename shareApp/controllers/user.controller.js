const User = require('../models/user.model').model;

module.exports.home = (_,res) => res.redirect('/user.html');

module.exports.me =
    async (req, res) =>  {
        const user = await User.findById(req.userId);
        console.log(user);
        console.log(req.userId);
        res.status(200).json({ id : user._id, name : user.name });
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

