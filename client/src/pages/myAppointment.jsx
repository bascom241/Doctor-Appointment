import React, { useContext, useEffect,useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './myAppointment.css';
import { DoctorContext } from '../components/DoctorContext';
import { toast } from 'react-toastify';





const Appointment = () => {
    const { token, url, userId, setAppointment, appointment ,getMyAppointment,book,setBook} = useContext(DoctorContext);

  



    console.log(book);
    console.log(appointment)


    const removeAppointment = async (doctorId) => {
        try {
            const response = await axios.delete(`${url}/api/v1/appointment/remove-appointment`, {
                data: { userId, doctorId },
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`}
            });
            if (response.status === 200) {
                toast.success('Appointment canceled successfully');
                // Update the state to remove the doctor from the relevant appointment
                setBook(prevAppointments =>
                    prevAppointments.map(appointment => ({
                        ...appointment,
                        doctors: appointment.doctors.filter(doctor => doctor.doctorId !== doctorId)
                    })).filter(appointment => appointment.doctors.length > 0) // Remove empty appointments
                );
            }
        } catch (err) {
            toast.error(err.message);
        
        }
    };
    
    const cancelAppointment = async () => {
        try {
            const response = await axios.delete(`${url}/api/v1/appointment/delete-appointment/${userId}`,{headers:{Authorization: `Bearer ${token}`}});
            if (response) {
                toast.success('All Appointment canceled successfully');
                setBook([]);
            }
        } catch (err) {

            if(book.length === 0 && appointment.length === 0) {
                toast.error('No Appointments to cancel')
            } else{
                toast.error(err.message);
            }
       
        }
    }

    useEffect(() => {
        if (userId) getMyAppointment();
    }, [userId]);


    
    

    return (
        <div className='appointment-ultimate-container'>
            <h2>My Appointments</h2>
            <div className='appointment-container'>
                <div>
                    {book.length === 0 ? (
                        <div className='bookk'><h2>No Appointment Found</h2><p>Please Book an appointment!!!</p></div>
                    ) : (
                        book.map((appointment, index) => (
                            <div key={index}>
                               
                                {appointment.doctors.map(doctor => (
                                    <div key={doctor.doctorId} className='appoint-description'>
                                        <div>
                                      
                                            <img src={doctor.image} alt={doctor.name} />
                                        </div>
                                        <div>
                                            <h2>{doctor.name}</h2>
                                            <p><b>Speciality:</b> {doctor.category}</p>
                                            <p><b>Appointment Fee:</b> ${doctor.appointmentFee}</p>
                                            <p><b>Degree:</b> {doctor.degree}</p>
                                            <p>{` ${appointment.day} @ ${appointment.time}`}</p>
                                        </div>
                                        <div className='remove'>
                                            <button onClick={() => removeAppointment(doctor.doctorId)}>cancel</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    )}
    
                    <div className='proceed'>
                        <Link to="/check-out">Pay Online</Link>
                        <Link onClick={cancelAppointment} style={{ cursor: 'pointer' }}>Cancel All Appointments</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
