import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <h4>About Us</h4>
          <Link to="/about">About Me</Link>
          <Link to='/#team'>Our Team</Link>
          <Link to="/about">Services</Link>
        </div>
        <div className="footer-links">
          <h4>Blog</h4>
          <Link to='/#blog'>Our Blog</Link>
        </div>
        <div className="footer-links">
          <h4>Affiliates</h4>
          <a href="https://www.linkedin.com/company/toshconsult/posts/?feedView=all">Affiliate Partners</a>
        </div>
        <div className="footer-icons">
          <a href="https://web.facebook.com/profile.php?id=61566812198077" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://x.com/basscotte_" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com/in/abdulbasit-abdulwahab-144507258/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/bascom101/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <p style={{paddingTop:'2rem'}}>Developed By <Link style={{fontStyle:'italic',color:'white'}}>Bascotte</Link></p>
      </div>
    </footer>
  );
};

export default Footer;
