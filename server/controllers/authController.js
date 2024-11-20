const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {promisify} = require('util')

const signToken = (id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_IN})
}
exports.createUser = async (req,res) =>{
    const {name,email,password,confirmPassword} = req.body;
    try{

        const isUser = await User.findOne({email});
        if (isUser){
            return res.status(404).json({message:'User already Exist'})
        }
        const user = await User.create({
            name:name,
            email:email,
            password:password,
            confirmPassword:confirmPassword

        })
        
        const token = signToken(user._id);
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

        let freshUser = await User.findById(decoded.id);
        freshUser = freshUser._id;

        res.status(200).json({status:'success', token,freshUser})

        
    }catch(err){
        res.status(500).json({status:'error',message:err.message});
    }

}


exports.signIn = async (req,res) =>{
    const {email,password} = req.body;
    try{
        if(!email || !password) {
            return res.status(403).json({status:'error',message:'User does not exit'});
        }


        const user = await User.findOne({email}).select('+password');
        if(!user || !(await user.comparePassword(password,user.password))){
            return res.status(403).json({status:'error',message:'Invalid Details'})
        }   

        const token = signToken(user._id);
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

        let freshUser = await User.findById(decoded.id);
        freshUser = freshUser._id;

        res.status(200).json({status:'success', token,freshUser})


    }catch(err){
        res.status(500).json({status:'error',message:err.message});
    }
}


exports.protect = async (req,res,next) =>{
    let token;
try{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return res.status(401).json({status:'error',message:'You are not logged in'});
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      

    let freshUser = await User.findById(decoded.id);
    req.user = freshUser
   
    next();



} catch(err){
    res.status(500).json({status:'error', message: err.message});
}

}