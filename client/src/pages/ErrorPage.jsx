import React from 'react';
import './ErrorPage.css'
import { Link } from 'react-router-dom';
const ErrorPage = () =>{
    return(
        <div className='error'>
            <h1>404 Page Not Found</h1>
            <Link to='/'>Go Back to Home Page</Link>
        </div>
    )
}

export default ErrorPage
