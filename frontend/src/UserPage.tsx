import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserPage : React.FC = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const res = await axios.get('/api/users');
            setUsers(res.data);
        } catch (error) {
            console.error('An error occurred while fetching users', error);
        }
    }

    useEffect(() =>  {
        getUsers();
    }, []);

    return (
        <div>
            <h1>All Users</h1>
            {users.map(user => (
                <div key={user.id}>
                    {}
                    <p><Link to={`/chat/${user.username}`}>{user.username}</Link></p>
                    {}
                </div>
            ))}
        </div>
    );
}

export default UserPage;