const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const config = require('../config');

/**
 * REGISTRAR USUARIO
 * @param {Request} req 
 * @param {Response} res 
 */
exports.signUp = async (req, res) => {
    
    const {username, email, password, roles} = req.body;

    const NewUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });
    
    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}});
        NewUser.roles = foundRoles.map(role => role._id);
    }

    if (!roles || !NewUser.roles.length) {
        const role = await Role.findOne({name: "user"});
        NewUser.roles = [role._id];
    }

    const savedUser = await NewUser.save();

    console.clear();
    console.log(savedUser)

    const token = JWT.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400
    });

    res.status(200).json(token);
};

/**
 * AUTENTICAR USUARIO
 * @param {Request} req 
 * @param {Response} res 
 */
exports.signIn = async (req, res) => {
    const userFound = await User.findOne({email: req.body.email}).populate("roles");

    if (!userFound) return res.status(400).json({message: "User not found"});

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);

    if (!matchPassword) {
        res.status(401).json({token: null, message: "invalid password"});
    }
    
    const token = JWT.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    });

    res.status(201).json({token})
};

