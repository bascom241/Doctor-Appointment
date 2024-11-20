import React, { useRef } from 'react';

import './About.css'
import { FaEnvelope } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaGlobe } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const About = () => {

    const form = useRef();


    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_8ylrkkr', 'template_8nrkk94', form.current, {
                publicKey: 'ZW99MvlPVKFRexJ7a',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    toast.success('Request sent! You will be updated soon.')
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    toast.error('Email sent failed')
                },
            );

        e.target.reset();
    };
    return (
        <div className='location-container'>
            {/* <div className='contact-banner'>
                <img src={Contact} />
            </div> */}


            <div className='location'>

                <div className='frame' style={{ width: '100%' }}>


                    <iframe
                        width="100%"
                        height="100%"
                        id='frame' src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Plot%2010%20Babatunde%20Yunusa%20asadam%20irewolede,%20Golden%20Sand%20ilorin+(Khalida.ng)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps trackers</a></iframe>


                </div>
                <div>
                    <h1>Get In Touch</h1>
                    <p>Got questions about your health? Need assistance with your appointment? Our team is ready to provide all the support you need. Reach out to us anytime, and we’ll get back to you as soon as possible!</p>
                    <div className='loc-description'>
                        <span><FaPhone /> <p>+2348081112753</p> </span>
                        <span><FaGlobe /><p>www.viscon.com</p></span>
                        <span><FaEnvelope /> <p>bascotee123@gmail.com</p> </span>
                        <span><FaMapMarkerAlt /><p>Irewolede Beside Golden Sand</p></span>
                        <span><FaTwitter /><p>@bascotee_</p></span>

                    </div>

                    <form className='send-message' ref={form} onSubmit={sendEmail}>
                        <h1 className='mess'>Send a message</h1>
                        <div>
                            <input
                                placeholder='Name'
                                type='text'
                                name='user_name'
                                required
                            />
                            <input
                                placeholder='email address'
                                type='text'
                                name='user_email'
                                required
                            />
                        </div>
                        <div>
                            <input
                                placeholder='Phone Number'
                                type='number'
                                name='user_number'
                            />
                            <select id='option' name='message'>
                                <option value='Services'>Services</option>
                                <option value='Complain'>Complain</option>
                                <option value='Contract'>Contract</option>
                                <option value='Appointment'>Appointment</option>
                                <option value='NewsLetter'>NewsLetter</option>

                            </select>
                        </div>
                        <div>
                            <textarea id='messageus' name='message' />
                        </div>

                        <button type='submit' className='submit-conplain'> Submit</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default About;
