
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Createpost from "./pages/createpost/Createpost";
import Posts from "./pages/posts/Posts";
import Profile from "./pages/profile/Profile";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Userprofile from "./pages/userprofile/Userprofile";

function App() {


  return (
    <>
    
     <BrowserRouter>
     
    <Routes>
   
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/signin" element={<SignIn/>} />
    <Route path='/home' element={<Posts/>}  />
    <Route path='/home/postprofile/:id' element={<Profile/>}  />
    <Route path='/createpost' element={<Createpost/>}  />
    <Route path='/userprofile' element={<Userprofile/>}  />
    </Routes>
    </BrowserRouter> 
    </>
  );
}

export default App;
