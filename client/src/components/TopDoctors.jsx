import React, { useContext, useEffect } from 'react';
import './TopDoctors.css';
import { DoctorContext } from './DoctorContext';
import { Link } from 'react-router-dom';

const TopDoctors = ({ doctors }) => {
const {fetchDoctors} = useContext(DoctorContext)

    useEffect(() => {
        fetchDoctors();
    }, []);
    return (
        <div className='doctor-card-container'>
            {doctors.length > 0 ? (
                doctors.map(dc => (
                    <div className='doctor-card' key={dc._id}>
                        <Link to={`detail/${dc._id}`}> {/* Corrected Link */}
                            <img src={dc.image} alt={dc.name} />
                            <p>{dc.name}</p>
                            <p>{dc.experience}yrs exp.</p>
                            <p>{dc.category}</p>
                        </Link>
                    </div>
                ))
            ) : (
                'Not Available'
            )}
        </div>
    );
};

export default TopDoctors;
