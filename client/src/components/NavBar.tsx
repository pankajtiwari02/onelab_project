import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Cookies from 'js-cookie'; 

import './NavBar.css'; 

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const accessToken = Cookies.get('access_token');
  console.log(accessToken)
  
  const username = Cookies.get('username');

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    Cookies.remove('access_token');
    Cookies.remove('username'); 
    navigate('/login'); 
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <span className="brand-name">MyApp</span>
        </div>
        <div className="navbar-right">
          {accessToken ? (
            <div className="username">
              <span>{username}</span>
              <button className="logout-btn" onClick={handleLogoutClick}>Logout</button>
            </div>
          ) : (
            <button className="login-btn" onClick={handleLoginClick}>Login</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
