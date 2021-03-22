const JWT = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const Role = require('../models/Role');

exports.verifyJWT = async (req, res, next) => {

    try{
        const token = req.headers["x-access-token"];

        if (!token) return res.status(403).json({message: "No token provided"})

        const decoded = JWT.verify(token, config.SECRET);

        req.userid = decoded.id;

        const CurrentUser = await User.findById(req.userid, {
            password: 0
        });

        if (!CurrentUser) return res.status(404).json({message: "User no found"})

        // res.status(201).json({message: "Authenticated!"});

        next();

    }catch(err) {
        return res.status(401).json({message: "Unauthorize!"})
    }
};

exports.isModerator = async (req, res, next) => {
    const user = await User.findById(req.userid);
    const roles = await Role.find({_id: {$in: user.roles }});

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }
    }

    return res.status(403).json({message: roles});
};

exports.isAdmin = async (req, res, next) => {

};
