
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/signin" element={<SignIn/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
