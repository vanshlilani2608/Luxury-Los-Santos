import React, { useEffect, useState } from 'react';
import '../header/header.css';
import Logo from '../Assests/images/LLS.png';
import lls from '../Assests/images/LuxuryLosSantos.png';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"><img src={lls} alt="Company Name" /></Link>
      </div>
      <nav className="navigation">
        <Link to="/yacht">Yacht</Link>
        <Link to="/penthouse">Penthouse</Link>
        <Link to="/aircraft">Aircraft</Link>
        <Link to="/automobiles">Automobiles</Link>
      </nav>
      <div className="header-icons">
        {isAuthenticated ? (
          <>
            <Link to="/carts"><FaShoppingCart className="icon" /></Link>
            <Link to="/profile"><FaUserCircle className="icon" /></Link>
          </>
        ) : (
          <Link to="/auth" className="sign-in-button">Sign In</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
