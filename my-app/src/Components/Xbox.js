import React, { useState, useEffect } from 'react';

const XboxGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:8000/Xbox');
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

  return (
    <div className="game-gallery">
      {games.map((game) => (
        <div key={game.id} className="game-card">
          <img src={game.cover_image} alt={game.title} className="game-image" />
          <h2 className="game-title">{game.title}</h2>
          <p className="game-description">{game.description}</p>
        </div>
      ))}
    </div>
  );
};

export default XboxGames;
