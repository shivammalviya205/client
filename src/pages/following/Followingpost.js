import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Navbar from '../../components/Navbar';
import { setPosts } from '../../state';
import Post from '../post/Post';
import './followingpost.scss'
const Followingpost = () => {

    const dispatch=useDispatch();
    const posts=useSelector((state)=>state.posts);
    const user=useSelector((state)=>state.user)
    const token=useSelector((state)=>state.token)
    const{picturePath,followers,following,userName,email,_id}=user;


    const getfollowingpost=async()=>{
       
        const response=await fetch(`http://localhost:3002/posts/${_id}/followingpost`,{
          method:'GET',
          headers:{
              Authorization:token,
              "Content-Type":"application/json",
          }
        })
        const data=await response.json();
        console.log(data);
        dispatch(setPosts({ posts: data }));
      }
  

 useEffect(()=>{
    getfollowingpost();
 },[])
  if(!posts)return;
  return (
    <>
    <Navbar/>
   <h1 id='text'>My Following <span>Posts</span></h1>
   <div className='video-grid'>
       { posts && posts.map((
            {
             _id,
             userId,
             userName,
             description,
             picturePath,
             userPicturePath,
             likes,
             comments,
             views,
            }
        )=>
         <Post 
         key={_id}
         postId={_id}
         postUserId={userId}
         userName={userName}
         description={description}
         picturePath={picturePath}
         userPicturePath={userPicturePath}
         likes={likes}
         comments={comments}
         views={views}
         />
        )
        }
   </div>
  </>
  )
}

export default Followingpost