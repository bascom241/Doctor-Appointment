import React, { useContext, useState } from 'react'
import './Login.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { DoctorContext } from '../components/DoctorContext';

const Login = () => {

    const navigate = useNavigate()
    const { url, setToken, setUserId } = useContext(DoctorContext);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState({});


    const handleFormChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((prev) => {
            return {
                ...prev, [name]: value
            }
        })
        setError(false)

    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (!formData.email.trim()) {
            validationErrors.email = 'email is required'
        }


        if (!formData.email.trim()) {
            validationErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "Email is not valid"
        }

        if (!formData.password.trim()) {
            validationErrors.password = "Password is required"
        }

        setError(validationErrors);

        if (Object.keys(validationErrors).length == 0) {
            try {


                const response = await axios.post(`${url}/api/v1/users/login`, formData, {
                    headers: { 'Content-Type': 'application/json' }
                })

                if (response.status == 200) {
                    setToken(response.data.token);
                    setUserId(response.data.freshUser);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.freshUser);
                    navigate('/');
                    toast.success(' Login successfully');

                }

            } catch (e) {

                toast.error('Invalid Email or Password')
            }
        }



    }
    return (
        <div className='form-container'>
            <h1 style={{ margin: '1rem 0rem' }}>Login</h1>
            <form onSubmit={handleFormSubmit}>
               
            <div className='nameInputContainer'>

                    {/* <label>E-mail</label> */}
                    <input
                        placeholder='E-mail address'
                        name='email'
                        value={formData.email}
                        onChange={handleFormChange}
                        
                    />
                    {error && <span>{error.email}</span>}

                </div>
                <div className='nameInputContainer'>
                    {/* <label>Password</label> */}
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={formData.password}
                        onChange={handleFormChange}
              
                    />
                          {error && <span>{error.password}</span>}
                </div>


                <div className='signUp'>
                    <button type='submit'>Submit</button>
                    <p>Dont have an account? Sign Up <Link to='/register'>Here</Link> </p>
                </div>

            </form>
        </div>
    )
}

export default Login
