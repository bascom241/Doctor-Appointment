const Appointment = require('../models/AppointmentModel');
const Doctor = require('../models/doctorModel');
const Order = require('../models/OrderModel');  // Assuming you have an Order model for tracking orders
const axios = require('axios');

exports.postOrder = async (req, res) => {
    const { userId, bookingPayment, appointment, reference, userData } = req.body;

    try {
        if (!appointment || !userData || !reference) {
            return res.status(400).json({
                message: 'Missing required fields: appointment, user information, or reference'
            });
        }

        // Verify the Paystack transaction
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
        });

        // Check if the transaction was successful
        if (response.data && response.data.data && response.data.data.status === 'success') {
            const order = new Order({
                userId,
                bookingPayment,
                items: appointment,
                userData,
                reference,
                paymentStatus: 'successful'
            });

            await order.save();

            await Appointment.updateMany(
                { userId: userId }, // Find all appointments for the user
                { $set: { doctors: [] } } // Set the doctors field to an empty array
            );

            return res.status(200).json({ status: 'success', message: 'Appointments cleared successfully', data: order });
        } else {
            const order = new Order({
                userId,
                bookingPayment,
                items: appointment,
                userData,
                reference,
                paymentStatus: 'fail'
            });

            await order.save();
            console.error('Paystack verification failed:', response.data);
            return res.status(400).json({
                message: 'Transaction verification failed',
                details: response.data
            });
        }
    } catch (err) {
        console.error("Verification error:", err);
        res.status(500).json({ message: 'An error occurred during order processing' });
    }
};

exports.getMyOrders = async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(404).json({ message: 'User not found' });
    }
    try {
        // Fetch orders and populate doctor details (name and appointment fee)
        const myOrder = await Order.find({ userId })
            .populate({
                path: 'items.doctorId', // Populate the doctorId field within items array
                select: 'name appointmentFee' // Only include name and appointmentFee
            });

        if (myOrder.length < 1) {
            return res.status(404).json({ status: false, message: 'No Order found for this user' });
        }
        
        res.status(200).json({ status: true, data: myOrder });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};
