
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import Changepassword from "./pages/Changepassword/Changepassword";
import Createpost from "./pages/createpost/Createpost";
import Followingpost from "./pages/following/Followingpost";
import Forgot from "./pages/Forgot/Forgot";
import Home from "./pages/home/Home";

import Profile from "./pages/profile/Profile";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Userprofile from "./pages/userprofile/Userprofile";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  const user=useSelector((state)=>state.user);
  let isallowed=false;
  if(user){
    if(user.isadmin===true){
      isallowed=true;
    }
  }
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<SignUp/>} />
    <Route path="/signin" element={<SignIn/>} />
    <Route path="/forgotpswd" element={<Forgot/>} />
    <Route path="/changepassword" element={<Changepassword/>} />
    <Route path="/admin" element={isallowed?<Admin/>:<Navigate to='/'/>} />
    <Route path='/home'  element={isAuth ? <Home /> : <Navigate to="/" />} />
    <Route path='/home/postprofile/:id' element={isAuth?<Profile/>:<Navigate to="/" />}  />
    <Route path='/createpost' element={isAuth?<Createpost/>:<Navigate to="/" />}  />
    <Route path='/userprofile/:postuserid' element={isAuth?<Userprofile/>:<Navigate to="/" />}  />
    <Route path='/following' element={isAuth?<Followingpost/>:<Navigate to="/" />}  />
    </Routes>
    </BrowserRouter> 
    </>
  );
}

export default App;
