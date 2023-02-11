import { createSlice } from '@reduxjs/toolkit';

const initialState={
    token:null,
    user:null,
    posts:[],
} 

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
        },
        setLogout:(state,action)=>{
          state.user=null;
          state.token=null;
        },
        setFollowing:(state,action)=>{
         if(state.user){
        state.user.friends=action.payload.friends;
        }
        else{
            console.error("user is not following anyone ");
        }
        },
        setFollowers:(state,action)=>{
            if(state.user){
           state.user.friends=action.payload.friends;
           }
           else{
               console.error("user is not following anyone ");
           }
           },
        setPosts:(state,action)=>{
            state.posts=action.payload.posts;
        },
        setPost:(state,action)=>{
            const updatedPosts=state.posts.map((post)=>{
                if(post._id===action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts=updatedPosts;
        }


    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;