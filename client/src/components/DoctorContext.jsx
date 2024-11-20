import {createContext, useState,useEffect } from "react";
import axios from 'axios'
import blogs from "./Blog/BlogData";
import { useParams } from "react-router-dom";
export const DoctorContext = createContext(null);


const DoctorContextProvider = (props)=>{
const [list,setList] = useState([]);
const url = "https://doctor-appointment-u77e.onrender.com";
const [appointment,setAppointment] = useState([]);
const [userId,setUserId] = useState(localStorage.getItem("userId"));
const [token,setToken] = useState(localStorage.getItem("token"));
const [book,setBook] = useState([]);

useEffect(()=>{
    const storedUser = localStorage.getItem("userId");
    if(storedUser){
        setUserId(userId);
    }
    const storedToken = localStorage.getItem("token");
    if(storedToken){
        setToken(token);
    }
},[])

const getMyAppointment = async () => {
    const response = await axios.get(`${url}/api/v1/appointment/get-appointment/${userId}`);
    setAppointment(response.data.data.flatMap(appointment => appointment.doctors)); // All doctor entries
    setBook(response.data.data); // All appointment data
};


const [blogList,setBlogList] = useState(blogs)


const fetchDoctors = async () =>{
    try{
        const response = await axios.get(`${url}/api/v1/doctors/doctors`);
        if(!response){
            console.log('error')
        }
        setList(response.data.data.doctors)
    }catch(err){
        console.log(err)
    }
}
    const contextValue = {
        list,
        setList,
        blogList,
        setBlogList,
        fetchDoctors,
        url,
        userId,
        setUserId,
        token,
        setToken,
        setAppointment,
        appointment,
        getMyAppointment,
        book,
        setBook
    }

    return (
        <DoctorContext.Provider value={contextValue}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider
