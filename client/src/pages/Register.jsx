import React, { useContext, useState } from 'react'

import './Register.css'
import { DoctorContext } from '../components/DoctorContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Register = () => {

    const navigate = useNavigate()
    const { url, setToken, setUserId } = useContext(DoctorContext);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [errors, setError] = useState({});
    // const pLength = formData.password.length;


    const handleFormChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    


    }



    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!formData.name.trim()) {
            validationErrors.name = "username is required"
        }

        if (!formData.email.trim()) {
            validationErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "Email is not valid"
        }

        if (!formData.password.trim()) {
            validationErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            validationErrors.password = "password must be at least 8 characters"
        }

        if (formData.confirmPassword !== formData.password) {
            validationErrors.confirmPassword = "password do not match"
        }

        setError(validationErrors)
        if (Object.keys(validationErrors).length == 0) {
            try {
                const response = await axios.post(`${url}/api/v1/users/register`, formData, {
                    headers: { 'Content-Type': 'application/json' }
                })

                if (response) {
                    setToken(response.data.token);
                    setUserId(response.data.freshUser);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.freshUser);
                    navigate('/');
                    toast.success('Accoun created successfully');

                }






            } catch (err) {

            }

        }


    }
    return (
        <div className='form-container'>
            <h1 style={{ margin: '1rem 0rem' }}>Register</h1>
            <form onSubmit={handleFormSubmit}>
                <div className='nameInputContainer'>
                    {/* <label>Full Name</label> */}



                    <input
                        placeholder='full name'
                        name='name'
                        value={formData.name}
                        onChange={handleFormChange}
               
                    />
                    {errors.name && <span>{errors.name}</span>}
                    
                </div>
                <div className='nameInputContainer'>
                    {/* <label>E-mail</label> */}


                    <input
                        placeholder='E-mail address'
                        name='email'
                        value={formData.email}
                        onChange={handleFormChange}
                    
                    />
                        {errors.email && <span>{errors.email}</span>}
                </div>
                <div className='nameInputContainer'>
                    {/* <label>Password</label> */}
                    <p></p>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={formData.password}
                        onChange={handleFormChange}
          
                    />
                        {errors.password && <span>{errors.password}</span>}
                </div>

                <div className='nameInputContainer'>
                    {/* <label>Confirm Password</label> */}

                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleFormChange}
           
                    />
                        {errors.confirmPassword&& <span>{errors.confirmPassword}</span>}
                </div>

                {/*  */}
                <div className='signUp'>
                    <button type='submit'>Submit</button>
                    <p>Already Have an account ? Sign In <Link to='/login'>Here</Link> </p>
                </div>

            </form>
        </div>
    )
}

export default Register
