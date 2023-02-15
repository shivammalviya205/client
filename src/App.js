
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Createpost from "./pages/createpost/Createpost";
import Followingpost from "./pages/following/Followingpost";
import Posts from "./pages/posts/Posts";
import Profile from "./pages/profile/Profile";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Userprofile from "./pages/userprofile/Userprofile";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <>
    
     <BrowserRouter>
     
    <Routes>
   
    <Route path="/" element={<SignUp/>} />
    <Route path="/signin" element={<SignIn/>} />
    <Route path='/home'  element={isAuth ? <Posts /> : <Navigate to="/" />} />
    <Route path='/home/postprofile/:id' element={isAuth?<Profile/>:<Navigate to="/" />}  />
    <Route path='/createpost' element={isAuth?<Createpost/>:<Navigate to="/" />}  />
    <Route path='/userprofile' element={isAuth?<Userprofile/>:<Navigate to="/" />}  />
    <Route path='/following' element={isAuth?<Followingpost/>:<Navigate to="/" />}  />
    </Routes>
    </BrowserRouter> 
    </>
  );
}

export default App;
