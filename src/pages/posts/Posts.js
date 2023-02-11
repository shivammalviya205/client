import './posts.scss'
import React,{useEffect}from 'react'
import Post from '../post/Post'
import { useDispatch,useSelector } from 'react-redux'
import { setPosts } from '../../state'
import Navbar from '../../components/Navbar'


const Posts = () => {

    const dispatch=useDispatch();
    const posts=useSelector((state)=>state.posts);
    
    const token=useSelector((state)=>state.token);

     //const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTNmNDA1OTA3OWNmMWQ5YTk4NjU2MiIsImlhdCI6MTY3NjE0MTg2Nn0.dAJRZsGQBl-sYS9_vFaCsvxLL3RrIXYxxOI0rSMq6ck"
    const getPosts=async()=>{
       
            const response = await fetch("http://localhost:3002/posts", {
                method: "GET",
                headers: { Authorization: token ,
                "Content-Type":"application/json"
            },
              });
              const data = await response.json();
              console.log(data);
              dispatch(setPosts({ posts: data }));
              console.log(posts);
    }

    useEffect(()=>{
       getPosts();
    },[])
     
    
    return (<>
        <Navbar/>
    <div className='video-grid'>
     {
        posts.map((
            {
             _id,
             userId,
             userName,
             description,
             picturePath,
             userPicturePath,
             likes,
             comments,
             
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
         />
        )
     }
        
    </div>
    </>
  )
}

export default Posts;