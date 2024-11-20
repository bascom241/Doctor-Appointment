const Appointment = require('../models/AppointmentModel');
const Doctor = require('../models/doctorModel');




exports.createAppointment = async (req, res) => {
    const { userId, time, day, doctorId, quantity } = req.body;

    try {
        // Validate required fields
        if (!userId || !time || !day || !doctorId || quantity <= 0) {
            return res.status(400).json({ status: false, message: "Invalid Data" });
        }

        // Verify that the doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ status: false, message: "Doctor Not Found" });
        }

        const existingAppointment = await Appointment.findOne({
            userId,
            "doctors.doctorId": doctorId
        })

        if (existingAppointment) {
            return res.status(400).json({ status: false, message: 'You cant book a doctor more than once in a week' })
        }

        const existingDayAppointment = await Appointment.findOne({
            day,
            time,
            "doctors.doctorId": doctorId
        })

        if(existingDayAppointment) {
            return res.status(400).json({status:false, message:'Day Booked try other days'})
        }
        // Find an existing appointment for the user on the specified day and time
        let appointment = await Appointment.findOne({ userId, day, time });

        // If no appointment exists, create a new one
        if (!appointment) {
            appointment = new Appointment({ userId, day, time, doctors: [] });
        }

        // Check if this doctor already exists in the appointment's doctors array
        const findAppointmentIndex = appointment.doctors.findIndex(doc => doc.doctorId.toString() === doctorId);

        // If doctor is not found, add a new entry; otherwise, update the quantity
        if (findAppointmentIndex === -1) {
            appointment.doctors.push({ doctorId, quantity });
        } else {
            appointment.doctors[findAppointmentIndex].quantity += quantity;
        }

        // Save the appointment
        await appointment.save();

        res.status(200).json({ status: 'success', data: appointment });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: 'error', message: "Error booking appointment", error: err.message });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        const { userId, doctorId } = req.body;

        // Validate inputs
        if (!userId || !doctorId) {
            return res.status(404).json({ status: '404 Not Found', message: 'User ID or Doctor ID missing' });
        }

        // Find the appointment that contains the user and specified doctor
        const appointment = await Appointment.findOne({ userId, "doctors.doctorId": doctorId });
        
        // If no appointment found, return an error
        if (!appointment) {
            return res.status(404).json({ status: false, message: "Appointment not found" });
        }

        // Find the index of the doctor in the doctors array
        const findAppointmentIndex = appointment.doctors.findIndex(
            (app) => app.doctorId.toString() === doctorId
        );

        // Check if doctor is not found
        if (findAppointmentIndex === -1) {
            return res.status(404).json({ status: false, message: "Doctor not found in this appointment" });
        }

        // Remove the doctor from the array
        appointment.doctors.splice(findAppointmentIndex, 1);

        // If no doctors remain in the appointment, delete the appointment record entirely
        if (appointment.doctors.length === 0) {
            await Appointment.deleteOne({ _id: appointment._id });
            return res.status(200).json({ status: 'success', message: "Appointment deleted successfully" });
        }

        // Otherwise, save the modified appointment
        await appointment.save();

        res.status(200).json({ status: 'success', message: "Doctor removed from appointment successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: 'error', message: err.message });
    }
};






exports.cancelAppointment = async (req, res) => {
    const { userId } = req.params;
  
    if (!userId) {
        return res.status(400).json({ status: 'error', message: "User ID is required" });
    }

    try {
        // Delete all appointments associated with the provided userId
        const result = await Appointment.deleteMany({ userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ status: 'error', message: "No appointments found for this user" });
        }

        res.status(200).json({ status: 'success', message: `${result.deletedCount} appointments were successfully deleted` });
    } catch (err) {
        console.error("Error while deleting appointments:", err);
        res.status(500).json({ status: 'error', message: "An error occurred while deleting appointments" });
    }
};


// Fetch all appointments for a specific user
exports.fetchAppointments = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(404).json({ status: 'false', message: "User Not Found" });
    }

    try {
        // Retrieve all appointments for the user
        const appointments = await Appointment.find({ userId }).populate({
            path: 'doctors.doctorId',
            select: 'name image appointmentFee degree category',
        });

        if (!appointments.length) {
            return res.status(404).json({ status: 'false', message: "No appointment found" });
        }

        // Format each appointment's doctor information
        const formattedAppointments = appointments.map(appointment => ({
            ...appointment._doc,
            doctors: appointment.doctors.map(appointmentDoctor => ({
                doctorId: appointmentDoctor.doctorId._id,
                name: appointmentDoctor.doctorId.name,
                image: appointmentDoctor.doctorId.image,
                appointmentFee: appointmentDoctor.doctorId.appointmentFee,
                degree: appointmentDoctor.doctorId.degree,
                category: appointmentDoctor.doctorId.category,
                quantity: appointmentDoctor.quantity,
            })),
        }));

        res.status(200).json({ status: 'success', data: formattedAppointments });
    } catch (err) {
        console.error('Error fetching appointments:', err.message);
        res.status(500).json({ status: 'error', message: err.message });
    }
};
