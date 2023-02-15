
import React from 'react'
import './Post.scss'
import img from '../../images/card.webp'
import profile from '../../images/profile.jpg'
import { IconButton, Typography } from '@mui/material'
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    
  } from "@mui/icons-material";
  import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from '../../state'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
const Post = ({
  postId,
  postUserId,
  userName,
  description,
  picturePath,
  userPicturePath,
  likes,
  comments,
  views,
}) => {
    
  const dispatch=useDispatch();
  const token=useSelector((state)=>state.token);
  const loggedInUserId=useSelector((state)=>state.user._id)
  const isLiked=Boolean(likes[loggedInUserId]);
  const likeCount=Object.keys(likes).length;
  const viewcount=90;
  const navigate=useNavigate()
  const patchLike=async()=>{
    const response=await fetch(`http://localhost:3002/posts/${postId}/like`,{
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
    dispatch((setPost({post:updatedPost})));
  };
  
  const handleclick=()=>{
    navigate(`/home/postprofile/${postId}`)
  }
  
  

  return ( 
    
   
 <div class="video-preview" >
   <div class="thumbnail-row" onClick={handleclick}>
     <img class="thumbnail" src={`http://localhost:3002/assets/${picturePath}`} alt=''/>
   </div>
   <div class="video-info-grid">
     <div class="channel-picture">
       { userPicturePath && (<img class="profile-picture" src={`http://localhost:3002/assets/${userPicturePath}`} alt='' />) }
     </div>
     <div className='item'>
      <Typography>{userName}</Typography>
     </div>
     <div className='item'  >
     <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color:'red' }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
     </div>
     <div className='item'>
        <IconButton>
     <VisibilityIcon/>
     </IconButton>
     <Typography>{views}</Typography>
     </div>
   </div>
 </div>

  )
}

export default Post 

