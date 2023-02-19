import React, { useState } from 'react'
import './Forgot.scss'
import { useNavigate } from 'react-router-dom'

import { Button, TextField } from '@mui/material';
import Changepassword from '../Changepassword/Changepassword';

// Put any other imports below so that CSS from your
// components takes precedence over default styles.
const Forgot = () => {

  const Navigate = useNavigate();
  const [email, setemail] = useState('')
  const [data, setdata] = useState(true)
  const [otpnumber, setotpnumber] = useState('');
   const [isverified,setisverified]=useState(false);


  async function handleotp(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:3002/auth/matchotp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, otpnumber
      })
    })

    const dat = await response.json()
    let status = dat.status;
    let message = dat.message;
    if (status === "success") {
      setisverified(true);
    }
    else{
      alert(message)
    }


  }

  async function handlesubmit(e) {

    e.preventDefault()

    const response = await fetch('http://localhost:3002/auth/forgotpswd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email
      })
    })

    const dat = await response.json()
    let msg = dat.message;
    alert(msg);
    let status = dat.status;
    if (status === "success") {

      setdata(false);
    }

  }
  return (
    <div className='center'>
       
       {isverified?<Changepassword email={email}/>:
        data ?
        <form onSubmit={handlesubmit} className='form'>
          <div><h1 id='text'>Forgot <span>Password!</span></h1></div>
      <div>
      <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="Enter your email" 
         type="text"  value={email} onChange={(e)=>setemail(e.target.value)} />
       </div>
      <Button className='btn' variant='contained' type="submit">Get OTP</Button>
      </form>
          :
          <form onSubmit={handleotp} className='form'>
             <div><h1 id='text'>Verify <span>OTP</span></h1></div>
            <div>
            <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="Enter OTP" 
         type="text" value={otpnumber} onChange={(e) => { setotpnumber(e.target.value) }} /> 
            </div>
            <Button className='btn' variant='contained' type="submit">Verify OTP</Button>
          </form>}

    </div>
  )
}

export default Forgot;

