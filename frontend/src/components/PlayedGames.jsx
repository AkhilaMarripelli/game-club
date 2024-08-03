// src/components/PlayedGames.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PlayedGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchPlayedGames();
  }, []);

  const fetchPlayedGames = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/playedgames', { headers: { Authorization: `Bearer ${token}` } });
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching played games', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Played Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map(game => (
          <div key={game.id} className="bg-white shadow-md rounded p-4">
            <h3 className="text-lg font-semibold">{game.name}</h3>
            <p className="text-gray-600">{game.description}</p>
            <p className="text-gray-800 font-bold">Rs. {game.amount}</p>
            <p className="text-gray-600">Played on: {new Date(game.playedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayedGames;
