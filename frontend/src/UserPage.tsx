import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';

const UserPage: React.FC = () => {
    const { getUsers } = useAuth();
    const [users, setUsers] = useState<string[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userList = await getUsers();
                setUsers(userList);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [getUsers]);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.username}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserPage;
