import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface User {
    id: string;
    username: string;
}

interface Message {
    senderId: string;
    senderName: string;
    content: string;
}

const MainPage: React.FC = () => {
    const { getUsers, user, logout, deleteUser } = useAuth();
    const [usersList, setUsersList] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            fetchMessages(selectedUser.id);
        }
    }, [selectedUser]);

    const fetchUsers = async () => {
        try {
            const userList = await getUsers();
            setUsersList(userList);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchMessages = async (userId: string) => {
        try {
            const response = await axios.get<Message[]>(`/api/messages/${userId}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    };

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedUser || !user) return;

        const message = {
            senderId: user.userId,
            senderName: user.username,
            receiverId: selectedUser.id,
            content: input
        };

        try {
            await axios.post(`/api/messages/send`, message);
            // Optimistic UI update: Add message immediately to local state
            setMessages((prevMessages) => [
                ...prevMessages,
                { ...message, timestamp: Date.now() }
            ]);
        } catch (error) {
            console.error('Error sending message:', error);
        }

        setInput("");
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleDeleteUser = async () => {
        try {
            if (user?.userId) {
                await deleteUser(user.userId);
                fetchUsers();
                setSelectedUser(null);
            } else {
                console.error('userId is undefined');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="main-page">
            <div className="user-list-container">
                <h2>Users</h2>
                <ul>
                    {usersList.map((user) => (
                        <li key={user.id} onClick={() => handleUserClick(user)}>
                            {user.username}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chat-container">
                {selectedUser && (
                    <div className="chat">
                        <h1>Chat with {selectedUser.username}</h1>
                        <div>
                            {messages.map((message, index) => (
                                <div key={index} className={message.senderId === user?.userId ? "outgoing" : "incoming"}>
                                    <strong>{message.senderName}: </strong>
                                    {message.content}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={sendMessage}>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                type="text"
                            />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                )}
            </div>
            <div className="action-buttons">
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleDeleteUser}>Delete User</button>
            </div>
        </div>
    );
};

export default MainPage;