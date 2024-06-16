import React, { useState } from 'react';
import './ChatPage.css';

interface Message {
    id: number;
    text: string;
    sender: string;
}

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const message: Message = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'User',
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };

    return (
        <div className="Chat">
            <div className="Messages">
                {messages.map((message) => (
                    <div key={message.id} className="Message">
                        <strong>{message.sender}: </strong>
                        <span>{message.text}</span>
                    </div>
                ))}
            </div>
            <div className="MessageInput">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage;
