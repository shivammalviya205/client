import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'


function Changepassword({email}) {

   console.log(email)
    const navigate=useNavigate()
    const [btnDisable,setBtnDisable]=useState(false)
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')


    const handleChangePassword= async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3002/auth/changepassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password
          })
        })
    
        const dat = await response.json()
        let status = dat.status;
        if (status==="success") {
           
            setBtnDisable(true);
            navigate('/signin');
        }
    
    
      }
    

    return (
        <div className='center'>
        
            <form onSubmit={handleChangePassword} className='form'>

            <h1>Change Password</h1>
                <div>
      <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="New password" 
         type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
       </div>
      
       <div>
      <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="Confirm Password" 
         type="password" value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
       </div>

                <div >
                    <Button sx={{marginTop:'10px'}}  variant='contained' type="submit" disabled={btnDisable}>{btnDisable?'Password Changed':'Change Password'}</Button>
                </div>
            </form>




        </div>
    )
}

export default Changepassword
