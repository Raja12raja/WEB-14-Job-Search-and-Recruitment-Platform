import React, { useContext, useEffect } from 'react'
import './App.css';
import { Route, Routes, Router} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import PostJob from './components/PostJob';
import Profile from './components/Profile';
import Login from './components/Login';
import Error404 from './components/Error404';


function App() {
  return (
    <div className="App">
     <Navbar/>
    
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/PostJob" element={<PostJob />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="*" element={<Error404/>}/>
      
      </Routes>
      </div>
  );
}

export default App;
