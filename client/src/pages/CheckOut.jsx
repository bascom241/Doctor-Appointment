import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../components/DoctorContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import './CheckOut.css';
import { useNavigate } from 'react-router-dom';
const CheckOut = () => {
  const { url, userId, setAppointment, setBook, book, appointment } = useContext(DoctorContext) || {};
console.log(appointment)
const navigate = useNavigate();
  useEffect(() => {
    const myAppointment = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/appointment/get-appointment/${userId}`);
        setAppointment(response.data.data.flatMap(appointment => appointment.doctors));
        setBook(response.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    myAppointment();
  }, [url, userId, setAppointment, setBook]);

  const totalFee = appointment.length > 0
    ? appointment.map(app => app.appointmentFee).reduce((total, item) => total + item, 0)
    : 0;

  const [userData, setUserData] = useState({ email: '', number: '', age: '', address: '' });

  console.log(book)
  
  const handleUserData = (evt) => {
    const { name, value } = evt.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };
  const handlePayStackPayment = (e) => {
    e.preventDefault();
    if (!window.PaystackPop) {
      toast.error('Please check your internet connection');
      return;
    }

    const payStackHandler = window.PaystackPop.setup({
      key: 'pk_test_f97aa28155d397abd254ce766f9bc35365f003b7',
      email: userData.email,
      amount: totalFee * 100,
      currency: 'NGN',
      callback: function (response) {
        if (response.reference) {
          verifyPayment(response.reference);
        } else {
          toast.error('Failed to obtain a valid payment reference');
        }
      },
      onclose: function () {
        toast.error('Transaction closed');
      }
    });
    payStackHandler.openIframe();
  };

  const verifyPayment = async (reference) => {
    try {
      const response = await axios.post(`${url}/api/v1/add-order`, {
        userData,
        userId,
        reference,
        bookingPayment: totalFee,
        appointment
      });

      if (response.data.status === 'success') {
        toast.success('Payment successfully verified and order created');
        setUserData('');
        setAppointment([]);
        setBook([])
        navigate(`/order-page/${userId}`)
      } else {
        toast.error('Payment verification failed');
        console.error('Server response:', response.data);
      }
    } catch (err) {
      toast.error(`Payment verification failed: ${err.response?.data?.message || err.message}`);
      console.error("Verification error:", err.response?.data || err);
    }
  };


  // Api for my Orders//

  // const getOrder = async () =>{
  //   const response = await axios.get(`${url}/api/v1/get-order/${userId}`);
  //   console.log(response.data.data);

  // }
  // useEffect(()=>{
  //   getOrder();
  // },[])




  return (
    <div className='check-out-container'>
      <form onSubmit={handlePayStackPayment}>
      <h1>Appointment Form</h1>
        <input
          type='email'
          placeholder='Email address'
          name='email'
          value={userData.email}
          onChange={handleUserData}
        />
        <input
          type='number'
          placeholder='Phone number'
          name='number'
          value={userData.number}
          onChange={handleUserData}
        />
        <input
          type='number'
          placeholder='Age'
          name='age'
          value={userData.age}
          onChange={handleUserData}
        />
        <input
          type='text'
          placeholder='Home Address'
          name='address'
          value={userData.address}
          onChange={handleUserData}
        />
        <button type='submit' className='payment-verify'>Proceed to Payment</button>
      </form>

      <div className='appointment-summary-container'>
        {/* <h2>Appointment Summary</h2> */}
        <div className='appointment-summary'>
          
          <h3 style={{textAlign:'center'}}>Doctors Booked</h3>
          {appointment.map(app => (<div key={app._id}>
            <img src={app.image} />
            <p className='pop'><b>{app.name}</b>  appointment fee: <b>{app.appointmentFee}</b></p>
    
          </div>))}
          <p><b>Total Fee:</b>{totalFee}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
