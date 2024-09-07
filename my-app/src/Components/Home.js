import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const pc = useNavigate()
  const showGamesHandelar = ()=>{
    pc("/pc-games")
  }

  const ps = useNavigate()
  const psHandler = ()=>{
    ps("/ps5-games")
  }

  const xbox = useNavigate()
  const xboxHandler = ()=>{
    xbox("/xbox-games")
  }

  const pcGamesRef = useRef(null);
  const xboxGamesRef = useRef(null);
  const psGamesRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="content">
        <section ref={pcGamesRef} className="section pc-games">
          <h2>PC Games</h2>
          <p>Explore the latest and greatest PC games, from strategy to action.</p>
          <button className="back-to-top" onClick={showGamesHandelar}>Back to PC Games</button>
        </section>

        <section ref={xboxGamesRef} className="section xbox-games">
          <p>Dive into the world of Xbox games with our top picks and reviews.</p>
          <button className="back-to-top" onClick={xboxHandler}>Back to Xbox Games</button>
        </section>

        <section ref={psGamesRef} className="section ps-games">
          <h2>PS Games</h2>
          <p>Discover the best PS games available, from exclusives to indies.</p>
          <button className="back-to-top" onClick={psHandler}>Back to PS Games</button>
        </section>
      </div>

 
    </>
  );
};

export default Home;
