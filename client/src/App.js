import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import Footer1 from './components/Footer';
import EditJob from './components/EditJob';
import './App.css';

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
    <div className="App min-h-screen flex flex-col">
      {showNavbar()}
      <div className="flex-grow">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/PostJob" element={<PostJob />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route path="/Dashboard2" element={<Dashboard2 />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/FillJob/:id" element={<FillJob />} />
          <Route exact path="/Manage/:id" element={<Manage />} />
          <Route exact path="*" element={<Error404 />} />
          <Route path="/edit/:id" element={<EditJob />} />
        </Routes>
      </div>
      <Footer1 />
    </div>
  );
}

export default App;
