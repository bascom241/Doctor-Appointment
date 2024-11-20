const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
    day:{
        type:String,
        required:[true,'Appointment Day Must be specified'],
        enum:['monday','tuesday','wednesday','thursday','friday']
    },
    time:{
        type:String,
        required:[true,'Time Must be specified']
    },
    isBooked:{
        type:Boolean,
        default:false
    },
    // users: [
    //     {
    //         userId: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'User',
    //             required: true
    //         },
            


    //     }
    // ],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:mongoose.Schema.Types.String,
        ref:'Doctor',

    },
  
    doctors:[
        {
            doctorId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Doctor',
                required:true
            },
            quantity:{
              type:Number,
              required:true,
              min:1
            }
        }
    ]

},{timestamps:true})

module.exports = mongoose.model('Appointment', bookingSchema)