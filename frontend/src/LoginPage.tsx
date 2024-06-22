import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import './LoginPage.css';

const LoginPage: React.FC = () => {
    const { login, register } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
        } catch (err) {
            setError('Login failed');
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(username, password);
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button className="login-button" type="submit">Login</button>
                </form>
                <h2>Or Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="reg-username">Username</label>
                        <input
                            type="text"
                            id="reg-username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-password">Password</label>
                        <input
                            type="password"
                            id="reg-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button className="register-button" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
