import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PcGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:8000/pc');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGames(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const handleShowDetails = (id) => {
    navigate(`/game/${id}`);
  };

  return (
    <div className="game-gallery">
      {games.map((game) => (
        <div key={game.id} className="game-card">
          <img src={game.cover_image} alt={game.title} className="game-image" />
          <h2 className="game-title">{game.title}</h2>
          <button onClick={() => handleShowDetails(game.id)} className="details-button">Show Details</button>
        </div>
      ))}
    </div>
  );
};

export default PcGames;
