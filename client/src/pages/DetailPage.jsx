import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { DoctorContext } from '../components/DoctorContext';
import axios from 'axios';
const DetailPage = () => {

    const {url} = useContext(DoctorContext);
    const [doctor,setDoctor] = useState([])
    const {id} = useParams()


    const fetchDoctor = async () =>{
        try{
            const response = await axios.get(`${url}/api/v1/doctors/doctors`);
            setDoctor(response.data);
            console.log(response)
        }catch(err){
        
        }
    }

    console.log(doctor)

    useEffect(()=>{
        fetchDoctor();
    },[])

    
  return (
    <div>
    <p>{doctor.name}</p>
      <h1>This is the Detail Page</h1>
      <h1>This is the Detail Page</h1>
      <h1>This is the Detail Page</h1>
      <h1>This is the Detail Page</h1>
      <h1>This is the Detail Page</h1>
      <h1>This is the Detail Page</h1>
    </div>
  )
}

export default DetailPage
