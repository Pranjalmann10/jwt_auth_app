const User = require('../models/userModel');
const creatError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');
const config = require('../config');

// register user
exports.signup = async (req , res , next) => {
    try{
        const user =  await  User.findOne({email: req.body.email});

        if(user){
            return next(new creatError('user already exists', 400));
        }
        const hasehdPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await User.create({
            //name: req.body.name,
            //email: req.body.email,
            //password: hasehdPassword,
            //role: req.body.role,
            ...req.body,
            password: hasehdPassword,
        });
//  ASSIGN JWT 
        const token = jwt.sign({_id: newUser._id}, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRES_IN,
        });


        res.status(201).json({
            status: 'success',
            message: 'user created successfully',
            token,
            user:{
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                _id: newUser._id,
            },
        });

    }
    catch(error){
        next(error);
    }
};
exports.login = async(req , res , next) => {
    try{
        const{email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return next(new creatError('user not found', 404));
        }
        const isPassowrdValid = await bcrypt.compare(password, user.password);
        if(!isPassowrdValid){
            return next(new creatError('invalid email or password', 401));
        }
        const token = jwt.sign({_id: user._id}, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRES_IN,
        });


        res.status(200).json({
            status: 'success',
            message: 'user logged in successfully',
            token,
            user:{
                name: user.name,
                email: user.email,
                role: user.role,
                _id: user._id,
            },
            
        });
    }

    catch(error){
        next(error);
    }
};