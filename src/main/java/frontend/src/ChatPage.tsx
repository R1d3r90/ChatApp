import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatPage.css';

interface Message {
    id: string;
    sender: string;
    receiver: string;
    content: string;
    timestamp: number;
}

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [receiver, setReceiver] = useState('');
    const sender = 'currentUser'; // This should be replaced with the actual current user

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/messages/${sender}/${receiver}`);
            setMessages(response.data);
        };

        if (receiver) {
            fetchMessages();
        }
    }, [receiver]);

    const handleSendMessage = async () => {
        const message = { sender, receiver, content: newMessage, timestamp: Date.now() };
        await axios.post(`${process.env.REACT_APP_API_URL}/messages`, message);
        setMessages([...messages, message]);
        setNewMessage('');
    };

    return (
        <div className="ChatPage">
            <h1>Chat</h1>
            <input
                type="text"
                placeholder="Receiver"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
            />
            <div className="messages">
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        <strong>{message.sender}</strong>: {message.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default ChatPage;
