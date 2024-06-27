import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import axios from 'axios';

const ChatComponent: React.FC<{ selectedUser: any }> = ({ selectedUser }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        if (selectedUser) {
            fetchMessages();
        }
    }, [selectedUser]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`/api/messages/${selectedUser.userId}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) {
            alert("Please select a user to chat with!");
            return;
        }

        try {
            await axios.post('/api/messages', {
                senderId: user.userId,
                receiverId: selectedUser.userId,
                content: input
            });
            setInput("");
            fetchMessages(); // Update messages after sending
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat">
            <div>
                {messages.map((message: any, i: number) => (
                    <div key={i} className={message.senderId === user.userId ? "outgoing" : "incoming"}>
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
    );
};

export default ChatComponent;