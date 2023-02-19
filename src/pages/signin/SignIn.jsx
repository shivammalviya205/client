import React, { useState } from 'react';
import axios from 'axios';
import './signin.scss'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logo from '../../images/dribble-transparent.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const dispatch=useDispatch()
   const navigate=useNavigate()
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/auth/login',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email, password
          })
      })
      const data= await response.json();
      console.log(data);
      console.log(data.token);
      console.log(data.user);
      dispatch(
        setLogin({
          user: data.user,
          token: data.token,
        })
      );
     if(data.token){
    navigate('/home')}
    else{
      alert(data.msg)
    }

    } catch (error) {
      alert(error);
    }
  };

  return ( 
    <div className="main">
      <div className="leftsignin"><a href='/'><img src={logo} alt="" /></a><h1>Discover the world’s <br/> top Designers & Creatives. </h1></div>
      <div className="right">
        <h1>Sign In to Dribbble</h1>
      <form onSubmit={handleSubmit}>
      <div>
      <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="Email" 
        input type="email"  value={email} onChange={handleEmailChange} />
      </div>
      <div>
      <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="Password" 
         type="password"  value={password} onChange={handlePasswordChange} />
       </div>
      <Button className='btn' variant='contained' type="submit" >Sign In</Button>
      <div className='downdiv'>
      <p><Link to='/forgotpswd'>Forgot password ?</Link></p>
      <p>Not a member ? <Link to='/'>Sign Up Now</Link></p>
     
      </div>
    </form>
      </div>
    </div>
    
  );
};

export default SignIn;