import { Button, TextField } from '@mui/material'
import React, {  useState } from 'react'
import axios from 'axios'
import './Createpost.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../state'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
const Createpost = () => {
  const navigate=useNavigate()
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
          const data = await response.data;
          console.log(data);
          await dispatch(setPosts({ posts: data }));
          if(data.length!==0)navigate('/userprofile');
        } catch (error) {
          console.error(error);
        }
      };


  return (
    <>
    <Navbar/>
    <div className='center'>
        <form onSubmit={handleSubmit} className='form'>
          <div><h1 id='text'>Showcase Your Work to <span>world!</span></h1></div>
     <div>
      <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" label="Title for Your Post" 
         type="text"  value={description} onChange={handledescription} />
       </div>
      <div>
        <TextField margin="normal"  required fullWidth  id="outlined-uncontrolled" 
          type="file"  onChange={handleimage}/>
      </div>
      <Button className='btn' variant='contained' type="submit">Create Post</Button>
      </form>
    </div>
    </>
  )
}

export default Createpost