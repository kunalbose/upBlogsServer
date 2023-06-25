const User = require("../models/User");
const { checkValid } = require("../utils/auth");
const bcrypt = require('bcrypt');

// register a user
async function registerController(req, res){
    const {username, password, email} = req.body;
    if(!username||!password||!email){
        return res.status(500).json("Missing data for signUp");
    }
    const result = await checkValid(username, email).catch(err=>{
        console.log(err);
        return res.status(500).json(err);
    });
    if(result){
        return res.status(409).json("Username or email already exists");
    }else{
        const hash = await bcrypt.hash(password, 2).catch(err => console.error(err.message));
        try{
            const newUser = new User({
                username,
                password: hash,
                email
            })
            const user = await newUser.save();
            const {password, ...info} = user._doc;
            return res.status(201).json(info);
        }catch(err){
            return res.status(500).json(err)
        }
        
    }
}

// login a user
async function loginController(req, res){
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(500).json("Missing data for signIn");
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json("Email does not exists");
        }
        const { password: hash } = user;
        const {email: emailDb, username, _id: id} = user;
        bcrypt
          .compare(password, hash)
          .then(BCres => {
            if(BCres){
                return res.status(200).json({email: emailDb, username, id});
            }else{
                return res.status(401).json("Wrong username or Password");
            }
          })
          .catch(err => console.error(err.message))  
    }catch(err){
        return res.status(500).json(err);
    }
}

// to check username
async function usernameCheckController(req, res){
    const {username} = req.body;
    const result = await checkValid(username);
    if(result){
        return res.status(409).json("username is taken");
    }else{
        res.status(200).json("Username available");
    }
}

// to check email
async function emailCheckController(req, res){
    const {email} = req.body;
    const result = await checkValid(null, email);
    if(result){
        return res.status(409).json("email is taken");
    }else{
        res.status(200).json("Email available");
    }
}

module.exports = {
    registerController,
    loginController,
    usernameCheckController,
    emailCheckController
}