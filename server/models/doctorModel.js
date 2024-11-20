const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Doctor's name is required"] 
    },
    image:String,
    category:{
        type:String,
        required:[true,'Doctors category is required']
    },
    status:{
        type:String,
        required:[true,"Doctor's status is required"]
    },
    experience:{
        type:Number,
        required:[true, "Doctor's experience is required"]
    },
    degree:{
        type:String,

    },
    about:{
        type:String,
        required:[true,'About is required']
    },
    appointmentFee:{
        type:Number,
        required:[true,'Appointment Fee is required']
    },
    isBooked:{
        type:Boolean,
        default:false
    }

})


module.exports = mongoose.model('Doctor', doctorSchema);
