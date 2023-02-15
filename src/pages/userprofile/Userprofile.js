import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Navbar from '../../components/Navbar';
import { setFollowers, setFollowing, setPosts } from '../../state';
import Post from '../post/Post';
import './userprofile.scss';
const Userprofile = () => {
    const dispatch=useDispatch();
    const posts=useSelector((state)=>state.posts);
    const user=useSelector((state)=>state.user)
    const token=useSelector((state)=>state.token)
    const following=useSelector((state)=>state.following);
    const followers=useSelector((state)=>state.followers);
    const{picturePath,userName,email,_id}=user; 
    // const[userfollowers,setuserfollowers]=useState([]);
    // const[userfollowing,setuserfollowing]=useState([]);
    
    //  const getUserFollowers=async()=>{
    //     try{
    //       const response=await fetch(`http://localhost:3002/user/${_id}/followers`,{
    //         method:'GET',
    //         headers:{
    //             Authorization:token,
    //             "Content-Type":"application/json",
    //         }
    //       });
    //       const data=await response.json();
    //       console.log(data);
    //        setuserfollowers(data);
    //     }catch(err)
    //     {
    //         console.log(err);
    //     }
    // }

    // const getUserFollowing=async()=>{
    //     try{
    //       const response=await fetch(`http://localhost:3002/user/${_id}/following`,{
    //         method:'GET',
    //         headers:{
    //             Authorization:token,
    //             "Content-Type":"application/json",
    //         }
    //       });
    //       const data=await response.json();
    //       console.log(data);
    //        setuserfollowing(data);
    //     }catch(err)
    //     {
    //         console.log(err);
    //     }
    // }

    
    
    const getUserPosts=async()=>{
       
          const response=await fetch(`http://localhost:3002/posts/${_id}/posts`,{
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


            const getUserFollowing=async()=>{
       
        const response = await fetch(`http://localhost:3002/user/${_id}/following`, {
            method: "GET",
            headers: { Authorization: token ,
            "Content-Type":"application/json"
        },
          });
          const data = await response.json();
          console.log(data);
          console.log(data.length);
          dispatch(setFollowing({ following: data }));
         console.log(posts);
}    

const getUserFollowers=async()=>{
       
  const response = await fetch(`http://localhost:3002/user/${_id}/followers`, {
      method: "GET",
      headers: { Authorization: token ,
      "Content-Type":"application/json"
  },
    });
    const data = await response.json();
    console.log(data);
    console.log(data.length);
    dispatch(setFollowers({ followers: data }));
    console.log(posts);
}     


   useEffect(()=>{
      getUserPosts();
      getUserFollowers();
      getUserFollowing();
   },[])


  return (
    <>
    <Navbar/>
    
    <Box sx={{ bgcolor: '#cfe8fc',paddingTop:'60px',paddingBottom:'20px' }}>
            <div className="profile-middle">
            <div className='profile-img'>
             <img  className='profile-img' src={`http://localhost:3002/assets/${picturePath}`} alt=''/>
            </div>
            <div className='flex-middle'>
                <div>
                <div><h1>{userName}</h1></div>
                <div><Typography>{userName.email}</Typography></div>
                <div>{email}</div>
              </div>
              <div className='data-box'>
            <div className='data'><Typography>{followers.length} Followers</Typography></div>
            <div className='data'><Typography>{following.length} Following</Typography></div>
            <div className='data'><Typography>{posts.length} Posts</Typography></div>
            </div>
            </div>
            </div>
   </Box>
   <Container/>
   <h1 id='text'>My <span>Posts</span></h1>
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

export default Userprofile