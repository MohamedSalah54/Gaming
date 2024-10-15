import React  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from './MyContext';


const Navbar = () => {
  const { isLogged, handleLogout } = useContext(MyContext);
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout();

    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyGamingSite</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/pc-games">PC Games</Link></li>
        <li><Link to="/xbox-games">Xbox Games</Link></li>
        <li><Link to="/ps5-games">PS5 Games</Link></li>
      </ul>
      <div className="navbar-auth">
        {isLogged ? (
          
          <button className="logout-button" onClick={onLogoutClick}>Logout</button>
       
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="signup-button">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
