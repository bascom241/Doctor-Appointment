import React, { useContext, useRef, useState } from 'react'
import './Header.css'
import { Link, NavLink } from 'react-router-dom'
import navLogo from '../assets/DocLogo-removebg-preview.png'
import { DoctorContext } from './DoctorContext'
import { FaUser } from 'react-icons/fa'
import { FaSignOutAlt } from 'react-icons/fa'
import { FaCalendarAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa'
const Header = () => {
  const { userId, token, setToken, setUserId, setAppointment } = useContext(DoctorContext);
  const [showInfo, setShowInfo] = useState(false);
  const [timer, setTimer] = useState(null)


  const logOut = () => {
    localStorage.removeItem("token", token);
    localStorage.removeItem("userId", userId);
    setToken('');
    setUserId('');
    setAppointment([]);
    toast.success('You Have Logged out successfully')
  }

  const handleMouseEnter = () => {
    setShowInfo(true);
    if (timer) clearTimeout(timer)
  }

  const handleMouseLeave = () => {
    const newTimer = setTimeout(() => {
      setShowInfo(false);
    }, 500)
    setTimer(newTimer)
  }


  const menuRef = useRef();

  const openNavBar = ()=>{
    menuRef.current.style.right = '0'
  }

  const closeNavBar = ()=>{
    menuRef.current.style.right = '-350px'
  }
  return (
    <div className='nav-contaner'>
      <nav>
        <Link to='/'><img src={navLogo} /></Link>
        <ul ref={menuRef} className='navlink-contaner'>
        <AiOutlineClose onClick={closeNavBar} className='close-icon'/>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='category'>All Doctors</NavLink>
          <NavLink to='about'>Contact</NavLink>

          {!token && <NavLink to='register'>Sign Up</NavLink>}
        </ul>
        
        <div className='user-profile-con'>
        <FaBars onClick={openNavBar} className='open-nav-name'/>
          {token ?
            <div>

              <FaUser className='userProfile' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
              <div className={`tooltip ${showInfo ? 'visible' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                <div>
                  <FaSignOutAlt />
                  <Link onClick={logOut}>Log Out</Link>
                </div>
                <div>
                  <FaCalendarAlt />
                  <Link to='my-appointments'>My appointment</Link>
                </div>
                <div>
                  <FaClipboardList />
                  <Link to={`/order-page/${userId}`}>My Orders</Link>

                </div>


              </div>
            </div> : ''}

        </div>
      
      </nav>
    </div>
  )
}

export default Header
