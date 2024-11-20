const mongoose = require('mongoose');
const validator = require('validator')
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'userId is required']
    },
    items: [
        {
            doctorId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Doctor',
                required: [true, 'doctorId is required']
            },
            
        }
    ],
    userData: {

        email: {
            type: String, required: true, validator: [validator.isEmail, 'Email is not valid']

        },
        age: {
            type: Number, required: true,
        },
        address: {
            type: String, required: true,
        }
    }
    ,

    bookingPayment: {
        type: String, required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'successful', 'fail'],
        default:'pending'
    },
  
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Order', orderSchema);