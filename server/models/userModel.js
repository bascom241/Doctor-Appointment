const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        validator:[validator.isEmail, 'email is not valid']
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minLength:8,
        
    },
    select: false,
    confirmPassword:{
        type:String,
        required:[true,'Please confirm Your Password'],
        validator:{
            validator:function(el){
            return el=== this.password
        }}

    },
    role:{
        type:String,
        default:'user'
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,12);
    this.confirmPassword = undefined;
    next();
})


userSchema.methods.comparePassword = async function(currentPassword, userPassword){
    return await bcrypt.compare(currentPassword, userPassword)
}

module.exports = mongoose.model('User', userSchema)