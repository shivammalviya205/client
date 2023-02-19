import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material'
import { Button,  IconButton, Typography } from '@mui/material'
import { color } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Comments from '../../components/Comments'
import ResponsiveDialog from '../../components/Hire'
import Navbar from '../../components/Navbar'
import { setPost } from '../../state'
import { setFollowing } from '../../state'
import './profile.scss'

const Profile = () => {
    const [particularpost,setParticularpost]=useState({})
    const[isLiked,setisLiked]=useState(false);
    const[likecount,setlikeCount]=useState(0);

     const {_id,picturePath}=useSelector((state)=>state.user)
     const{id}=useParams();
     const posts=useSelector((state)=>state.posts);
     const dispatch=useDispatch();
     const token=useSelector((state)=>state.token);
     const loggedInUserId=useSelector((state)=>state.user._id)
      const following=useSelector((state)=>state.following);
     const [toggle, setToggle] = useState(false);
    
     //modal for hire me
     const [open, setOpen] = React.useState(false);
     const handleClickOpen = () => {
      setOpen(true);
    };
  

     const getpost=async()=>{
        const filteredpost= await posts.filter(({_id})=>(_id===id))
         setParticularpost(filteredpost[0]);
         setisLiked(Boolean(filteredpost[0].likes[loggedInUserId]));
         setlikeCount(Object.keys(filteredpost[0].likes).length);
         console.log(likecount);
     }

     const patchLike=async()=>{
      const response=await fetch(`http://localhost:3002/posts/${id}/like`,{
        method:"PATCH",
        headers:{
          Authorization:token,
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
         userId:loggedInUserId
        })
      })
      const updatedPost=await response.json();
      console.log(likecount);
     dispatch((setPost({post:updatedPost})));
     setisLiked(Boolean(updatedPost.likes[loggedInUserId]));
     setlikeCount(Object.keys(updatedPost.likes).length);
     console.log(likecount);
    };
    
   

    const togglefollow=async()=>{
      if(loggedInUserId===particularpost.userId) return;
      const response=await fetch(`http://localhost:3002/user/${loggedInUserId}/${particularpost.userId}/togglefollow`,{
        method:"PATCH",
        headers:{
          Authorization:token,
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          userId:loggedInUserId
         })
      });
      const data=await response.json();
      const formattedfollowing= await data.data;
     dispatch((setFollowing({following:formattedfollowing})));
      console.log(formattedfollowing);
      console.log(data);
    }

    const isfollowing=following.find((friend)=>friend._id===particularpost.userId);

     useEffect(()=>{  
       getpost();
     },[toggle,isfollowing])

    if(particularpost.length===0) return;
   

  return (
    <div>
    <Navbar/>
    <div className='box'>
    <div className='flex '>
         <div className="flex" style={{flexDirection:'column'}}><img className='profileimg' src={`http://localhost:3002/assets/${particularpost.userPicturePath}`} alt="" />
         <div><Typography>{particularpost.userName}</Typography></div>
         </div>
        <div className="flex middle">
            <div>{particularpost.description}</div>
           
        </div>
        <div className="flex" style={{justifyContent:'flex-end'}}>
          <div className='item'>
          {loggedInUserId!==particularpost.userId && <div><button className='upload-btn' onClick={handleClickOpen}>
        Hire me</button></div>}
          </div>
        </div>
        <div className="flex">  
        <div className='item'>
       
        {loggedInUserId!==particularpost.userId && <div onClick={togglefollow} style={{cursor:'pointer',marginRight:'15px'}}><Button variant='contained'>{isfollowing?'Following':'Follow'}</Button></div>}
       
          <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color:'red' }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likecount}</Typography>
     </div></div>
    </div>
    <div className='flex item'>
     <img className='postimg item' src={`http://localhost:3002/assets/${particularpost.picturePath}`} alt=''/>
    </div>
    <div className='comments-box'>
     {particularpost.comments && (<Comments comments={particularpost.comments} token={token} userId={loggedInUserId} postId={id} setToggle={setToggle}/>)}
    </div>
    </div>
    <ResponsiveDialog open={open} setOpen={setOpen} token={token} postUserId={particularpost.userId} id={loggedInUserId} />
    </div>
  )
} 

export default Profile 

