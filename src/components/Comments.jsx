import { Button, TextareaAutosize, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from '../state';
import Comment from './Comment';
import './Comments.scss';


// const initialValue = {
//     name: `${nam}`,
//     postId: '',
//     date: new Date(),
//     comments: ''
// }

const Comments = ({comments,token,userId,postId,setToggle }) => {
    
    const url = 'https://static.thenounproject.com/png/12017-200.png'
    const {picturePath}=useSelector((state)=>state.user);
    const [comment, setComment] = useState({});
    //const [comments, setComments] = useState([]);
    const [data, setData] = useState();
    //const [toggle, setToggle] = useState(false);
    const loggedinuserid=userId;
     const dispatch=useDispatch();
    // useEffect(() => {
    //     const getData = async () => {
    //        // const response = await getComments(post._id);
    //        // setComments(response);
    //     }
    //     getData();
    // }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
          userId:loggedinuserid,
          textcomment:e.target.value
        });
        setData(e.target.value);
    }

    const addComment = async() => {
       // await newComment(comment);
       const response = await fetch(`http://localhost:3002/posts/${postId}/postcomment`,{
        method:'POST',
        headers: {
             Authorization:token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            comment
          )
      });
      const updatedPost=await response.json();
    dispatch((setPost({post:updatedPost})));
        setData('')
        setToggle(prev => !prev); 
        
    }
    

  
    return (
        <Box sx={{marginBottom:'30px !important'}} >
            <Box className="container-1" >
            <img src={`http://localhost:3002/assets/${picturePath}`} className="image" alt="" />   
                <TextareaAutosize 
                    rowsMin={5} 
                    className="textarea" 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={data}
                    style={{marginTop:'10px',padding:'10px'}}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    className="button"
                    onClick={(e) => addComment(e)}
                    sx={{marginTop:'13px'}}
                >Post</Button>  
                          
            </Box>
            <Box>
                {
                    comments && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} userId={userId} token={token} postId={postId} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;