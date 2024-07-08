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
import Dashboard2 from './components/Dashboard2';
import Manage from './components/Manage';


function App() {
  const location = useLocation();

  const showNavbar = () => {
    const hideNavbarPaths = ['*'];
    const currentPath = location.pathname;

    if (!hideNavbarPaths.includes(currentPath)) {
      return <Navbar />;
    }
  };

  return (
    <div className="App">
      {showNavbar()}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/PostJob" element={<PostJob />} />
        <Route exact path="/Dashboard" element={<Dashboard />} />
        <Route path="/Dashboard2" element={<Dashboard2 />} />``
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/Apply/:id" element={<FillJob />} />
        <Route exact path="/Manage/:id" element={<Manage />} />
        <Route exact path="*" element={<Error404 />} />
      </Routes>
      <Footer1 />
    </div>
  );
}

export default App;
