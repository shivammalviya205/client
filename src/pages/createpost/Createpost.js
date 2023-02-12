import { Button, TextField } from '@mui/material'
import React, {  useState } from 'react'
import axios from 'axios'
import './Createpost.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../state'
const Createpost = () => {
    const [image, setImage] = useState(null);
    const[description,setdescription]=useState('');
    const userId=useSelector((state)=>(state.user._id))
    const token=useSelector((state)=>(state.token))
    const dispatch=useDispatch()
    const handledescription=(e)=>{
        setdescription(e.target.value);
    }
    const handleimage=(e)=>{
        setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('description', description);
        formData.append('image', image);
        formData.append('userId',userId);
        try {
          const response = await axios.post('http://localhost:3002/posts/create', formData, {
            headers: {
              Authorization:token,
              'Content-Type': 'multipart/form-data'
            }
          });
          const data = await response.json();
          console.log(data);
          dispatch(setPosts({ posts: data }));
        } catch (error) {
          console.error(error);
        }
      };


  return (
    <div className='center'>
        <form onSubmit={handleSubmit}>
     <div>
      <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="Title" 
         type="text"  value={description} onChange={handledescription} />
       </div>
      <div>
        <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" 
          type="file"  onChange={handleimage}/>
      </div>
      <Button className='btn' variant='contained' type="submit">Create Account</Button>
      </form>
    </div>
  )
}

export default Createpost