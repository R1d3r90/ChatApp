import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/UserPage');
    };

    return (
        <div>
            <h2>MainPage</h2>
            <button onClick={handleButtonClick}>Go to UserPage</button>
        </div>
    );
};

export default MainPage;
