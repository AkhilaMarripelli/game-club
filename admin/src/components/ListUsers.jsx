import React, { useState, useEffect } from 'react';
import crossicon from './Assets/Admin_Assets/cross_icon.png';

const ListUsers = () => {
    const [allUsers, setAllUsers] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:5000/allusers')
            .then((res) => res.json())
            .then((data) => { setAllUsers(data); });
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const remove_user = async (id) => {
        const response = await fetch('http://localhost:5000/removeuser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Response from server:', data);
        await fetchInfo();
    };

    return (
        <div className='w-[80%] h-screen bg-gray-200'>
            <div className='flex-col flex items-center bg-white m-2 h-screen gap-6'>
                <div><p className='font-semibold text-2xl'>All Users List</p></div>
                <div className='flex justify-around w-full px-10 font-semibold'>
                    <div className='flex gap-6'>
                        <div>Username</div>
                        <div>Email</div>
                    </div>
                    <div className='flex gap-6'>
                        <div>Remove</div>
                    </div>
                </div>
                {
                    allUsers.map((user, index) => {
                        return (
                            <div className='flex justify-around w-full px-10' key={index}>
                                <div className='flex gap-6'>
                                    <div><p>{user.username}</p></div>
                                    <div><p>{user.email}</p></div>
                                </div>
                                <div className='flex gap-6'>
                                    <div><button onClick={() => { remove_user(user._id) }}><img src={crossicon} alt="Remove User" /></button></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ListUsers;
