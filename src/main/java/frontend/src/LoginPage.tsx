import React from 'react';

const LoginPage: React.FC = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/github';
    };

    return (
        <div className="LoginPage">
            <h1>Login</h1>
            <button onClick={handleLogin}>Login with GitHub</button>
        </div>
    );
}

export default LoginPage;
