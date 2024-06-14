import React from 'react';
import './App.css';
import Chat from './Chat';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Simple Chat App</h1>
            </header>
            <main className="App-main">
                <Chat />
            </main>
            <footer className="App-footer">
                <p>© 2024 Simple Chat App. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
