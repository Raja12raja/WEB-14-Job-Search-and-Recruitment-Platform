import React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import PostJob from './components/PostJob';
import Profile from './components/Profile';
import Login from './components/Login';
import Error404 from './components/Error404';
import FillJob from './components/FillJob';
import Cards from './components/Cards';

function App() {
  const location = useLocation();

  const showNavbar = () => {
    const pathsWithNavbar = ['/', '/PostJob', '/Dashboard', '/profile', '/login', '/Apply/:id'];
    return pathsWithNavbar.some(path => location.pathname.match(new RegExp(`^${path.replace(':id', '[^/]+')}$`))) && <Navbar />;
  };

  return (
    <div className="App">
      {showNavbar()}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PostJob" element={<PostJob />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Apply/:id" element={<FillJob />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
