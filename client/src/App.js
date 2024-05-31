import React, { useContext, useEffect } from 'react'
import './App.css';
import { Route, Routes, Router} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
     <Navbar/>
    
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/profile" element={<Profile />} />
      
      </Routes>
      </div>
  );
}

export default App;
