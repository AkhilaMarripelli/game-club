import React, { useState, useEffect } from 'react';

const ManageRecharges = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');

  const fetchRequests = async () => {
    const response = await fetch('http://localhost:5000/pendingrecharges');
    const data = await response.json();
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRecharge = async (requestId) => {
    const response = await fetch('http://localhost:5000/approverecharge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ requestId })
    });

    if (response.ok) {
      setMessage('Recharge approved successfully.');
      fetchRequests(); // Refresh the requests list
    } else {
      setMessage('Failed to approve recharge.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-2xl mb-4'>Manage Recharge Requests</h1>
      {message && <p className='mt-4 text-red-500'>{message}</p>}
      <div className='w-3/4'>
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request._id} className='flex justify-between p-4 mb-2 bg-white shadow'>
              <div>
                <p>User ID: {request.userId._id}</p>
                <p>Username: {request.userId.username}</p>
                <p>Email: {request.userId.email}</p>
                <p>Amount: {request.amount}</p>
                <p>Status: {request.status}</p>
              </div>
              <button
                onClick={() => approveRecharge(request._id)}
                className='px-4 py-2 bg-green-500 text-white'
              >
                Approve
              </button>
            </div>
          ))
        ) : (
          <p>No pending requests.</p>
        )}
      </div>
    </div>
  );
};

export default ManageRecharges;
