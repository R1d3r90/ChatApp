import React, { useState, useEffect } from 'react';
import Message from './Message'; // Beispiel für Message-Komponente
import axios from 'axios'; // Beispiel für HTTP-Anfragen

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        fetchMessages(); // Beispiel für Laden von Nachrichten beim Start
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get<Message[]>('/api/messages'); // Beispiel für HTTP-GET-Anfrage
            setMessages(response.data);
        } catch (error) {
            console.error('Fehler beim Laden der Nachrichten:', error);
        }
    };

    const sendMessage = async (text: string) => {
        try {
            const newMessage = { text, sender: 'User' }; // Beispiel für neue Nachricht
            const response = await axios.post<Message>('/api/messages', newMessage); // Beispiel für HTTP-POST-Anfrage
            setMessages([...messages, response.data]); // Füge neue Nachricht zur Liste hinzu
        } catch (error) {
            console.error('Fehler beim Senden der Nachricht:', error);
        }
    };

    return (
        <div className="Chat">
            <h2>Chat</h2>
            <div className="Messages">
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
            </div>
            <div className="MessageInput">
                {/* Beispiel für Eingabefeld und Senden-Button */}
                <input type="text" placeholder="Nachricht eingeben" />
                <button onClick={() => sendMessage('Hallo!')}>Senden</button>
            </div>
        </div>
    );
};

export default Chat;
