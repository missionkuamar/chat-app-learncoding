import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import Home from "./page/Home"; 
import { Toaster } from "react-hot-toast";

function App() {
  return (
   <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
     <Toaster position="top-center" reverseOrder={false} />
   </>
  );
}

export default App;
