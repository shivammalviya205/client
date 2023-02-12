import { Button } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img from '../images/dribble.png'
import './Navbar.scss'
import profile from '../images/profile.jpg'
import { useSelector } from 'react-redux'
import { setLogout } from '../state';
const Navbar = () => {
  const {_id,picturePath}=useSelector((state)=>state.user)
  const navigate=useNavigate();
  console.log(_id);
  console.log(picturePath);

  const handlelogout=()=>{
     setLogout();
     navigate('/signin')
  }
  return (
    <div className='nav'>
        <div className='leftnav'> 
           <ul>
            <li className="flex item"><Link to='/'><img className='logo-img' src={img} alt="" /></Link></li>
            <li className="item">Inspiration</li>
            <li className="item">Find work</li>
            <li className="item">Learn Design</li>
            <li className="item">Go Pro</li>
            <li className="item">Hire Designers</li>
           </ul>
        </div>
        <div className='rightnav'>
            <div className="dropdown">
   <img src={`http://localhost:3002/assets/${picturePath}`} className="dropbtn" alt="" />
   <div className="dropdown-content">
    <a href="/">My Profile</a>
    <a href="/">Edit Profile</a>
    <div className='a' onClick={handlelogout}>Logout</div>
   </div>
    </div>
        </div>
    </div>
  )
}

export default Navbar