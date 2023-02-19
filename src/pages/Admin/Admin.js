import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state';
import Posts from '../posts/Posts';
import './Admin.scss'
const Admin = () => {

     const dispatch=useDispatch();
     const posts=useSelector((state)=>state.posts);
    const userId=useSelector((state)=>state.user._id);
    const token=useSelector((state)=>state.token);
    const getPosts=async()=>{
       
        const response = await fetch("http://localhost:3002/posts", {
            method: "GET",
            headers: {Authorization:token,
            "Content-Type":"application/json"},
          });
          const data = await response.json();
        //   console.log(data);
          dispatch(setPosts({ posts: data }));
        //   console.log(posts);
}  

     useEffect(()=>{
       getPosts();
     },[])


  return (
    <Posts posts={posts}/>
  )
  
}

export default Admin