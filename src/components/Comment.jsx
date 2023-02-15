import { Delete } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setPost } from "../state";
import './Comment.scss';
const Comment = ({ comment, setToggle,userId,token,postId, }) => {
    const iscommentowner=comment.userId===userId;
    const dispatch=useDispatch();
     
    const removeComment = async() => {
        // await newComment(comment);
        const response = await fetch(`http://localhost:3002/posts/${postId}/deletecomment`,{
         method:'POST',
         headers: {
              Authorization:token,
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
            requserId:userId,reqtextcomment:comment.textcomment,
           }
           )
       });
       const updatedPost=await response.json();
       dispatch((setPost({post:updatedPost})));
       
         setToggle(prev => !prev); 
         
     }

    return (
        <Box className="component">
            <Box className="container" >
            <img src={`http://localhost:3002/assets/${comment.userPicturePath}`} className="image" alt="" /> 
                <Typography sx={{marginLeft:'10px'}}>{comment.userName}</Typography>
                <Typography sx={{marginLeft:'20px'}}>{comment.textcomment}</Typography>
                {/* <Typography className="date">{new Date(comment.date).toDateString()}</Typography> */}
                {iscommentowner &&(<Delete className="delete" onClick={() => removeComment()} />)}
            </Box>
            <Typography>{comment.comments}</Typography>
        </Box>
    )
}

export default Comment;