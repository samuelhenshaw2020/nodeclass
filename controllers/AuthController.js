const User =  require("../models/User");
const {randomBytes} = require("crypto");
const mailer = require("../config/mail");
const { MAIL_FROM, AUTH_SECRET } = require("../config/env");
const {startSession} = require('mongoose');
const { validationResult } = require("express-validator");
const { HttpStatusCodes, JWT_ALGORITHM } = require("../utils/constants");
const formidable = require("formidable");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { readFileSync } = require("fs");
const { join } = require("path");
const { root_path } = require("../global.config");


module.exports.Register =  async function Register(req, res) {
    const {name, password, email} = req.body;

    const valid = validationResult(req)
    if(!valid.isEmpty()){
        return res.status(HttpStatusCodes.CONFLICT).json({message: "Invalid fields", errors: valid.array()});
    }

    const session = await startSession() ;
    session.startTransaction();
    
    try {
        await new User({
            name, 
            password,
            email,
            role: "CUSTOMER"
        }).save({session: session});
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        return res.status(402).json({message: "User Registration failed"})
    }

    // update the user count

    // try {
    //     await mailer.sendMail({
    //         to: email,
    //         from: String(MAIL_FROM),
    //         subject: "Welcome to Shop4me",
    //         text: "Hello world?", // plain text body
    //         html: "<b>Hello world?</b>", // html body,
    //     })
    // } catch (error) {
    //   //logger
    //   await session.abortTransaction();
    //   return res.status(500).json({message: "registration failed"})
    // }

    await session.commitTransaction()
    res.status(201).json({message: "User registrered success"})
    await session.endSession()
} 

module.exports.Login =  async function Login(req, res) {
   
    //VAlidation
    const valid = validationResult(req)
    if(!valid.isEmpty()) {
        return res.status(HttpStatusCodes.CONFLICT).json({message: "Error occured", errors: valid.array()[0]})
    }
    const {email, password} = req.body;

    try {
        //check for user
        const user  = await User.findOne({email}); //return object if user is found or null if not

        if(user == null){
            res.status(HttpStatusCodes.UNAUTHORIZED)
                .json({message: "User login unsuccessfully. email error"})
            return;
        }

        //verified password
        const verifyPassword = await bcrypt.compare(password, user.password)
        if(!verifyPassword) {
            res.status(HttpStatusCodes.UNAUTHORIZED)
            .json({message: "User login unsuccessfully. password error"})
            return;
        }

        //obtained a token
        let payload = {
            name: user.name,
            id: user._id
        }   
        const privateKey = readFileSync(join(root_path, 'private.key'))
        const token = jwt.sign(payload, privateKey, {algorithm: JWT_ALGORITHM});

        user.password = null;
        res.status(200).json({message: "Login Successfull", token, user})
       
        
    } catch (error) {
        console.log(error)
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({message: "an unexpected error occureed"})
    }

   
} 


module.exports.currentUser = async (req, res) => {
    res.status(202).json(req.user)
}

// module.exports.GetUserAndUserPost = async (req, res) => {
//     try {

//         const posts = await Post.find({"users": req.user._id}).
//         res.status(201).json(posts)
//     } catch (error) {
//         return res.status(500).json({message: "error occured"})
//     }
// }