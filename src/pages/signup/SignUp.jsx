import React, { useState } from 'react';
import axios from 'axios';
import './signup.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logo from '../../images/dribble-transparent.png';
//import { style } from '@mui/system';
import { Link } from 'react-router-dom';
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userName', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3002/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return ( 
    <div className="main">
      <div className="left"><a href='/'><img src={logo} alt="" /></a><h1>Discover the world’s <br/> top Designers & Creatives. </h1></div>
      <div className="right">
        <h1>Sign up to Dribbble</h1>
      <form onSubmit={handleSubmit}>
      <div>
      <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="UserName" 
      type="text" value={name} onChange={handleNameChange}
       />
      </div>
      <div>
      <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="Email" 
        input type="email"  value={email} onChange={handleEmailChange} />
      </div>
      <div>
      <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="Password" 
         type="password"  value={password} onChange={handlePasswordChange} />
       </div>
      <div>
        <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" 
          type="file" onChange={handleImageChange} />
      </div>
      <Button className='btn' variant='contained' type="submit">Create Account</Button>
      <p>Already have an account ? <Link to='/signin'>Sign In</Link></p>
    </form>
      </div>
    </div>
    
  );
};

export default SignUp;