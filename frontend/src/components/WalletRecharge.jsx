import React, { useState } from 'react';

const WalletRecharge = () => {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const handleRecharge = async () => {
    if (amount < 100 || amount > 2500) {
      setMessage('Amount must be between 100 and 2500.');
      return;
    }

    const response = await fetch('http://localhost:5000/requestrecharge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ amount })
    });

    if (response.ok) {
      setMessage('Recharge request sent successfully.');
    } else {
      setMessage('Failed to send recharge request.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-2xl mb-4'>Wallet Recharge</h1>
      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className='mb-4 p-2 border border-gray-400'
        placeholder='Enter amount to recharge'
      />
      <button onClick={handleRecharge} className='px-4 py-2 bg-blue-500 text-white'>
        Recharge
      </button>
      {message && <p className='mt-4 text-red-500'>{message}</p>}
    </div>
  );
};

export default WalletRecharge;
