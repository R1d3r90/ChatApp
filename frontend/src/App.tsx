import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage.tsx'
import MainPage from './MainPage.tsx';
import UserPage from './UserPage.tsx'
import ChatPage from './ChatPage.tsx';
import { AuthProvider } from './AuthProvider';

const App: React.FC = () => {
    return (
        <AuthProvider>
        <Router>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">LoginPage</Link>
                    </li>
                    <li>
                        <Link to="/MainPage">MainPage</Link>
                    </li>
                    <li>
                        <Link to="/UserPage">UserPage</Link>
                    </li>
                    <li>
                        <Link to="/ChatPage">ChatPage</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/MainPage" element={<MainPage/>}/>
                <Route path="/UserPage" element={<UserPage />} />
                <Route path="/ChatPage" element={<ChatPage />} />
            </Routes>
        </div>
        </Router>
        </AuthProvider>
    );
}

export default App;
