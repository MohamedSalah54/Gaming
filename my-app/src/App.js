import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavBar';
import PcGames from './Components/Pc';
import PsGames from './Components/Ps';
import XboxGames from './Components/Xbox';
import Home from './Components/Home';
import Footer from './Components/Footer';
import SignInForm from './Components/Signin';
import SignUpForm from './Components/Signup';
import GameDetails from './Components/Details'; // Create this component

import { MyContext } from './Components/MyContext';


const App = () => {
  const [text,setText] = useState("");

  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setLogged(true);
    }
  }, []);

  const handleLogin = (email) => {
    localStorage.setItem('userEmail', email);
    setLogged(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setLogged(false);
  };

  return (
    <MyContext.Provider value={{text,setText}}>
    <Router>
      <main>
      <Navbar isLogged={isLogged} handleLogout={handleLogout} />
        <Routes>
                
          
          <Route path="/" element={<Home />} />
          <Route path="/pc-games" element={<PcGames />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/xbox-games" element={<XboxGames />} />
          <Route path="/ps5-games" element={<PsGames />} />
          <Route
            path="/login"
            element={<SignInForm onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<SignUpForm onLogin={handleLogin} />}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
    </MyContext.Provider>
  );
};

export default App;
