import React,{useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { setPosts } from '../../state'
import Navbar from '../../components/Navbar'
import Posts from '../posts/Posts'
import { Search } from '@mui/icons-material'
//import './Home.scss';
import classes from "./Home.module.css";
import CustomizedInputBase from '../../components/SearchBar'
import FilterComponent from '../../components/FilterComponent'
import { sortByDate, sortByLikes } from '../../utilities'
const Home = () => {
 
      const[query,setquery]=useState('');
      const[postquery,setpostquery]=useState('');
      const [filterterm, setfilterterm] = React.useState('Following');
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
    
    
    let filteredposts=(postquery==='')?(posts.filter((post)=>post.userName.toLowerCase().includes(query.toLowerCase()))):
    (posts.filter((post)=>post.description.toLowerCase().includes(postquery.toLowerCase())))
       
     async function filtering(){
     // Sort by likes
     if(filterterm==='Popular'){ filteredposts= await sortByLikes(filteredposts); console.log(filteredposts)}
    // Sort by date
    else if(filterterm==='Latest'){ filteredposts= await sortByDate(filteredposts);}
     }
     filtering();
     console.log(filteredposts)
    useEffect(()=>{
       getPosts();
      // getUserFollowing();
    },[posts.length])
      
  console.log(filteredposts);
  return (
    <>
    <Navbar/>
    <CustomizedInputBase query={query} setquery={setquery} postlength={filteredposts.length} postquery={postquery} setpostquery={setpostquery}/>
    <FilterComponent filterterm={filterterm} setfilterterm={setfilterterm}/>
    <Posts posts={filteredposts}/>
     
    </>
    
  )
}

export default Home