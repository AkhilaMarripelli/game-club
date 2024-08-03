// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomePage({ isLoggedIn, onLogout }) {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching games...");
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get('/api/games');
      console.log('Response from server:', response.data); // Log the response
      if (Array.isArray(response.data)) {
        setGames(response.data);
        console.log("Games fetched successfully");
      } else {
        console.error('Unexpected response data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching games', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gaming Club</h1>
        <div>
          {isLoggedIn ? (
            <button onClick={onLogout} className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded">Logout</button>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded">Login</button>
              <button onClick={() => navigate('/register')} className="bg-green-800 hover:bg-green-700 text-white py-2 px-4 rounded ml-2">Sign Up</button>
            </>
          )}
        </div>
      </header>
      <main className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold mb-2">Welcome to the Gaming Club!</h2>
          <p className="text-gray-600">Experience the best games and manage your membership with ease.</p>
        </div>
        <div className="flex justify-center gap-4 flex-wrap">
          {games.map(game => (
            <div key={game._id} className="bg-white shadow-md rounded p-4 w-64">
              <h3 className="text-lg font-semibold">{game.name}</h3>
              <p className="text-gray-600">{game.description}</p>
              <p className="text-gray-800 font-bold">Rs. {game.amount}</p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-2 rounded mt-2">Play</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
