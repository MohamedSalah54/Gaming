import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/pc/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGame(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;
  if (!game) return <div className="error">Game not found</div>;

  return (
    <div className="game-details">
      <img src={game.cover_image} alt={game.title} className="game-image" />
      <h2 className="game-title-details">{game.title}</h2>
      <p className="game-description">{game.description}</p>
      <button onClick={() => navigate('/pc-games')} className="back-button">Back to Gallery</button>
    </div>
  );
};

export default GameDetails;
