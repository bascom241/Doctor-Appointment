import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../components/DoctorContext'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './Detail.css'
import { toast } from 'react-toastify'
const Detail = () => {

  const [doctor, setDoctor] = useState([]);
  console.log(doctor)

  const { id } = useParams()


  const { url, userId ,token} = useContext(DoctorContext);
  console.log("userId from DoctorContext:", userId);
  console.log("doctorId from URL params:", id);
  const fetchDoctor = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/doctors/doctor/${id}`);
      setDoctor(response.data.doctor);
    } catch (error) {
      console.error('Error fetching doctor:', error);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [])


  // Booking Slots Space 

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  // const [quantity, setQuantity] = useState(1); 


  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const times = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'];
  const bookAppointment = async () => {
    if (!selectedDay || !selectedTime) {
      toast.error('Please select a day and a time before booking');
      return;
    }
  
    try {
      const appointmentData = {
        userId,
        doctorId: id,
        time: selectedTime,
        day: selectedDay,
        quantity: 1 // Ensure quantity is a number
      };
  
      console.log("Sending appointment data:", appointmentData);
  
      const response = await axios.post(`${url}/api/v1/appointment/create-appointment`,appointmentData,
        {headers:{Authorization:`Bearer ${token}`}} );
  
      if (response && token) {
        toast.success(`Appointment created at ${selectedTime} on ${selectedDay}`);
      } else {
        toast.error('Failed to create the appointment');
      }
  
      console.log(response);
    } catch (error) {
      console.log('Error creating appointment:', error);
  
      // Check if the error response exists
      if (error.response) {
        // Display the specific error message returned from the server
        toast.error(error.response.data.message || 'Failed to create the appointment');
      } else {
        // Fallback for other types of errors
        toast.error('An unexpected error occurred');
      }
    }
  };
  
  const handleTimeSelect = (time) =>{
    toast.success(`${time} selected`);
    setSelectedTime(time);
  }

  const handleDaySelect = (day) =>{
    toast.success(`${day} selected`);
    setSelectedDay(day)
  }

  // const status = doctor.status;
  return (

    <div className='detail-ultimate-container'>


      <div className='detail-container'>
        <div className='detail detail-1'>
          <img src={doctor.image} />
        </div>
        <div className='detail detail-2'>
          <h2>{doctor.name}</h2>
          <div className='degree'>
            <p>{doctor.degree}</p>
            <p>{doctor.experience} Years</p>
          </div>
          <div>
            <h2>About</h2>
            <p>{doctor.about}</p>
          </div>

          <h3>Appointment Fee:${doctor.appointmentFee}</h3>


        </div>

      </div>
      <div className='detail-3'>
        <h2>Booking Slots</h2>
        <ul className='booking-days'>
          {days.map(day =>
            <li onClick={() => handleDaySelect(day)} key={day._id}>{day}</li>
          )}
        </ul>

        <ul className='booking-times'>
          {times.map(time => <li onClick={() => handleTimeSelect(time)} key={time._id}>{time}</li>)}
        </ul>  

        <button onClick={bookAppointment}>Book Appointment</button>
      </div>


 
    </div>
  )
}

export default Detail