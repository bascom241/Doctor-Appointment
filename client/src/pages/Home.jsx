import React, { useContext, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Home.css';
import { Link } from 'react-router-dom';
import { BsCalendarCheck } from 'react-icons/bs';
import { MdLocalHospital } from 'react-icons/md';
import { BiSupport } from 'react-icons/bi';

import banner from '../assets/b10.jpg';
import onco from '../assets/onco.jpg';
import Gyny from '../assets/Gyny1.jpg';
import cardio from '../assets/Cardio.png';
import RADIO from '../assets/Cardio.png';
import Neuro from '../assets/Neuro.png';
import Endo from '../assets/Endo.png';
import Derma from '../assets/derma.png';
import TopDoctors from '../components/TopDoctors';
import general from '../assets/general.jpg';
import pedia from '../assets/pdia2.png';
import { DoctorContext } from '../components/DoctorContext';
import bannerImg from '../assets/immerce.jpg';
import subBanner from '../assets/subBa.jpg';
import Blog from '../components/Blog/Blog';
import Team from '../components/Team/Team';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const Home = () => {
    const { list, fetchDoctors } = useContext(DoctorContext);
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    const filter = (category) => {
        const filtered = list.filter(
            (doctor) =>
                doctor.category.toLowerCase() === category.toLowerCase() &&
                doctor.experience >= 15
        );
        setFilteredDoctors(filtered);
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    console.log(list)
    // Populate `filteredDoctors` when `list` updates
    useEffect(() => {

        const filList = list.filter(f => f.experience >= 15);
        if (list.length > 0) {
            setFilteredDoctors(filList);
        }
    }, [list]);

    const fadeInVariant = {
        hidden: {
            opacity: 0,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                delay: 0.3,
            },
        },
    };

    const [bannerRef, bannerInView] = useInView({ triggerOnce: true });
    const [specialSectionRef, specialInView] = useInView({ triggerOnce: true });
    const [topDoctorsRef, topDoctorsInView] = useInView({ triggerOnce: true });
    const [offerSectionRef, offerInView] = useInView({ triggerOnce: true });
    const [subBannerRef, subBannerInView] = useInView({ triggerOnce: true });




    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_8ylrkkr', 'template_8nrkk94', form.current, {
                publicKey: 'ZW99MvlPVKFRexJ7a',
            })
            .then(
                () => {
               
                    toast.success('Thank you for subscribing')
                },
                () => {
              
                    toast.error('Email sent failed')
                },
            );

        e.target.reset();
    };


    return (
        <motion.div className="home-container" style={{ overflowX: 'hidden' }}>
            <motion.div
                ref={bannerRef}
                variants={fadeInVariant}
                initial="hidden"
                animate={bannerInView ? 'visible' : 'hidden'}
                className="container"
            >
                <img src={banner} alt="Banner" className="img" />
            </motion.div>

            <motion.div
                ref={specialSectionRef}
                variants={fadeInVariant}
                initial="hidden"
                animate={specialInView ? 'visible' : 'hidden'}
                className="special-section container"
            >
                <div className="special-text">
                    <h2>Ease Book by navigating through our specialists</h2>
                    <p>
                        A Guide: Click any of the following to get desired results and book an
                        appointment
                    </p>
                </div>

                <div className="specialist-container container">

                    <div
                        className="specialist-card"
                        onClick={() => filter('cardiologist')}
                    >
                        <img src={cardio} alt="Cardiologist" />
                        <p>Cardiologist</p>
                    </div>
                    <div
                        className="specialist-card"
                        onClick={() => filter('pediatrician')}
                    >
                        <img src={pedia} alt="pediatrician" />
                        <p>Pediatrician</p>
                    </div>
                    <div
                        className="specialist-card"
                        onClick={() => filter('general')}
                    >
                        <img src={general} alt="General" />
                        <p>General Surgeon</p>
                    </div>
                    <div
                        className="specialist-card"
                        onClick={() => filter('neurologist')}
                    >
                        <img src={Neuro} alt="Neurologist" />
                        <p>Neurologist</p>
                    </div>
                    <div
                        className="specialist-card"
                        onClick={() => filter('Oncologist')}
                    >
                        <img src={onco} alt="Oncologist" />
                        <p>Oncologist</p>
                    </div>
                    <div
                        className="specialist-card"
                        onClick={() => filter('Gynecologist')}
                    >
                        <img src={Gyny} alt="Gynecologist" />
                        <p>Gynecologist</p>
                    </div>
                    <div
                        className="specialist-card"
                        onClick={() => filter('Endocrinologist')}
                    >
                        <img src={Endo} alt="Endocrinologist" />
                        <p>Endocrinologist</p>
                    </div>
                    <div
                        className="specialist-card"
                        onClick={() => filter('radiologist')}
                    >
                        <img src={RADIO} alt="Radiologist" />
                        <p>Radiologist</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                ref={topDoctorsRef}
                variants={fadeInVariant}
                initial="hidden"
                animate={topDoctorsInView ? 'visible' : 'hidden'}
            >
                <h1 style={{ marginTop: '4rem', textAlign: 'center' }}>
                    Our Top Doctors
                </h1>
                <TopDoctors doctors={filteredDoctors} />
            </motion.div>

            <motion.div
                ref={offerSectionRef}
                variants={fadeInVariant}
                initial="hidden"
                animate={offerInView ? 'visible' : 'hidden'}
                className="offer-container"
            >
                <h1>What we Offer</h1>
                <div className="offers">
                    <div>
                        <p className="icon">
                            <BsCalendarCheck />
                        </p>
                        <p>Free and easy appointment booking.</p>
                    </div>
                    <div>
                        <p className="icon">
                            <MdLocalHospital />
                        </p>
                        <p>Get a free medical diagnosis.</p>
                    </div>
                    <div>
                        <p className="icon">
                            <BiSupport />
                        </p>
                        <p>24/7 customer support for all your needs.</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                ref={subBannerRef}
                variants={fadeInVariant}
                initial="hidden"
                animate={subBannerInView ? 'visible' : 'hidden'}
                className="ban-sub-container"
            >
                <img src={subBanner} />
                <div className="wrapP">
                    <h1>Hey User,</h1>
                    <p>
                        Subscribe to our newsletter for the latest tips and
                        offers.
                    </p>
                    <p className="ppp">
                        Be the first to know about new services and promotions.
                    </p>
                    <p className="ppp">
                        Stay informed and empowered on your health journey.
                    </p>
                    <p className="ppp">
                        <strong>Subscribe now</strong> to get updates delivered
                        to your inbox!
                    </p>
                    <form className='send-message' ref={form} onSubmit={sendEmail}>
                        <input
                            placeholder='email address'
                            type='text'
                            name='user_email'
                            required
                        />
                        <button>Subscribe</button>
                    </form>
                </div>
            </motion.div>

            <div>
                <Blog />
            </div>

            <div>
                <Team />
            </div>
        </motion.div>
    );
};

export default Home;
