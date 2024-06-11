import React, { useContext, useEffect } from 'react'
import './App.css';
import { Route, Routes, Router} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Profile from './components/Profile';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
     <Navbar/>
    
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/login" element={<Login />} />
      
      </Routes>
      </div>
  );
}

export default App;
