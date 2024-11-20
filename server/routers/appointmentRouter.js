const express = require('express');

const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authController = require('../controllers/authController');
router.route('/create-appointment').post(authController.protect,appointmentController.createAppointment);
router.route('/get-appointment/:userId').get(appointmentController.fetchAppointments);
router.route('/remove-appointment').delete(authController.protect,appointmentController.deleteAppointment);
router.route('/delete-appointment/:userId').delete(authController.protect,appointmentController.cancelAppointment);
module.exports= router;