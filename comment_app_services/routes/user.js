const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cryptojs =require('crypto-js');
const jwt = require('jsonwebtoken');

const userModel = require('../schema/userModel');
const { AES } = require('crypto-js');

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const HASH_SECRET_KEY = process.env._SECRET_KEY;

//register
router.route('/register').post( async(req, res) => {

    //checking for the existence of the user in the database
    const emailExist = await userModel.findOne({email: req.body.email})
    if(emailExist) {
        return res.status(400).json('Email already exists');
    }

    const email = req.body.email;
    const password = await cryptojs.AES.encrypt(req.body.password, this.toString(HASH_SECRET_KEY).toString());
    console.log(password);
    const secret = req.body.secret;
    
    //create a new user
    const newUser = new userModel({email, password, secret});
    await newUser.save()
           .then(() => res.json({status:'ok', message:'user registered successfully!', newUser}))
           .catch(err => res.status(400).json(`Error: ${err}`));
});

//login
router.route('/login').post( async(req, res) => {

    //checking for the existence of the user in the database 
    const user = await userModel.findOne({email: req.body.email}).select('+password');
    if(!user) {
        return res.status(400).json('Email is not found');
    } 

    //checking the correctness of the password 
    //const valid = await ;
    if(!(JSON.stringify(cryptojs.AES.decrypt(req.body.password, this.toString(HASH_SECRET_KEY).toString()) === user.password))) {
        return res.status(400).json('Invalid password');
    }

    const token = jwt.sign({id: user._id}, JWT_SECRET_KEY);
    res.header('auth-token', token).json({status:'ok', token:token});

});

//forgot password
router.route('/forgotpassword').post(async(req, res) => {
    const secretKey = req.body.secret;
    const email = req.body.email;
    await userModel.find({email: email, key: secretKey}).select('+password')
             .then((user) => res.json({status:'ok', password: cryptojs.AES.decrypt((user[0].password), this.toString(HASH_SECRET_KEY)).toString(cryptojs.enc.Utf8)}))
             .catch((err) => console.log(err)); 
});

module.exports = router;